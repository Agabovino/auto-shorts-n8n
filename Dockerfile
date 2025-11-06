FROM n8nio/n8n

USER root

RUN apk add --no-cache \
    ffmpeg \
    python3 \
    py3-pip \
    curl \
    build-base \
    git \
    python3-dev \
    libsndfile

# Install yt-dlp
RUN pip3 install --break-system-packages yt-dlp

# Set up a working directory for the application
WORKDIR /data

USER node