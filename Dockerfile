FROM python:3.11-slim

# Install system dependencies for OCR and PDF rendering.
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
    tesseract-ocr-heb \
    poppler-utils \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8501

# Railway injects PORT at runtime. Keep secrets such as GEMINI_API_KEY in Railway variables.
CMD ["sh", "-c", "streamlit run streamlit_flights.py --server.address=0.0.0.0 --server.port=${PORT:-8501}"]
