param(
    [string]$ImageName = "flights-app",              # Docker image name
    [string]$Model     = "gemini-1.5-flash-latest"   # Gemini model name
)

Write-Host "=== STEP 1: Check GEMINI_API_KEY on host ===" -ForegroundColor Cyan

if (-not $env:GEMINI_API_KEY) {
    Write-Host "GEMINI_API_KEY is NOT set on the host." -ForegroundColor Red
    Write-Host "Set it with something like:" -ForegroundColor Yellow
    Write-Host '$env:GEMINI_API_KEY = "your_api_key_here"' -ForegroundColor Yellow
    exit 1
}

$key = $env:GEMINI_API_KEY
$masked = if ($key.Length -gt 8) {
    $key.Substring(0,4) + "..." + $key.Substring($key.Length-4)
} else {
    ("*" * $key.Length)
}

Write-Host "GEMINI_API_KEY is set on host: $masked" -ForegroundColor Green


# ===========================
# STEP 2: Test from host
# ===========================
Write-Host "`n=== STEP 2: Test Gemini HTTP call from host ===" -ForegroundColor Cyan

$body = @{
    contents = @(
        @{
            parts = @(
                @{
                    text = "Ping from PowerShell on host"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 5

$url = "https://generativelanguage.googleapis.com/v1beta/models/$Model`:generateContent?key=$key"

try {
    $resp = Invoke-WebRequest -Uri $url -Method POST -ContentType "application/json" -Body $body -ErrorAction Stop
    Write-Host "Host HTTP status: $($resp.StatusCode)" -ForegroundColor Green
    $content = $resp.Content
    $snippetLength = [Math]::Min($content.Length, 500)
    Write-Host "Host response snippet:" -ForegroundColor Gray
    Write-Host $content.Substring(0, $snippetLength)
} catch {
    Write-Host "Host call to Gemini FAILED:" -ForegroundColor Red
    Write-Host $_
}


# ===========================
# STEP 3: Test inside Docker
# ===========================
Write-Host "`n=== STEP 3: Test Gemini from inside Docker container ===" -ForegroundColor Cyan

# Make sure Docker is available
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "Docker command not found. Skipping container test." -ForegroundColor Yellow
    exit 0
}

# Create a temporary Python file with a simple Gemini test
$tmpPy = [System.IO.Path]::GetTempFileName()
$tmpPy = [System.IO.Path]::ChangeExtension($tmpPy, ".py")

$pythonCode = @'
import os
import json
import urllib.request

key = os.environ.get("GEMINI_API_KEY")
if not key:
    print("GEMINI_API_KEY missing inside container")
    raise SystemExit(1)

model = os.environ.get("GEMINI_MODEL", "gemini-1.5-flash-latest")
url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key=" + key

payload = {
    "contents": [
        {
            "parts": [
                {"text": "Ping from Python inside Docker container"}
            ]
        }
    ]
}

data = json.dumps(payload).encode("utf-8")
req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})

try:
    with urllib.request.urlopen(req, timeout=20) as resp:
        print("Container HTTP status:", resp.status)
        text = resp.read().decode("utf-8", errors="ignore")
        print("Container response snippet:", text[:500])
except Exception as e:
    print("Container call failed:", repr(e))
'@

Set-Content -Path $tmpPy -Value $pythonCode -Encoding UTF8

Write-Host "Temporary Python test file created at: $tmpPy" -ForegroundColor DarkGray

# Run the test inside the Docker image
try {
    docker run --rm `
        -e GEMINI_API_KEY=$env:GEMINI_API_KEY `
        -e GEMINI_MODEL=$Model `
        -v "${tmpPy}:/tmp/test_gemini.py" `
        $ImageName `
        python /tmp/test_gemini.py
} catch {
    Write-Host "Docker test failed:" -ForegroundColor Red
    Write-Host $_
} finally {
    # Clean up temp file
    if (Test-Path $tmpPy) {
        Remove-Item $tmpPy -Force
    }
}
