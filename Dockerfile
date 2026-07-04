FROM python:3.10-slim

ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=${GEMINI_API_KEY}

# Install system dependencies for Tesseract + PDF → image
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-eng \
	tesseract-ocr-heb \
    poppler-utils \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    && apt-get clean

# If you want Hebrew OCR too:
# RUN apt-get install -y tesseract-ocr-heb

# Create app directory
WORKDIR /app

# Copy requirements first (for Docker caching)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt




# Copy application code
COPY . .

COPY query_flight_ticket.py .


# Streamlit port
EXPOSE 8501

# Start Streamlit
CMD ["streamlit", "run", "streamlit_flights.py", "--server.address=0.0.0.0"]
