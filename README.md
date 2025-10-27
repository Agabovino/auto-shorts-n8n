# Docker N8N Template

This repository provides a Docker-based environment for running N8N, with the addition of `ffmpeg` and `yt-dlp` for enhanced multimedia processing capabilities.

## Included Tools

*   **N8N:** A free and open-source workflow automation tool.
*   **ffmpeg:** A complete, cross-platform solution to record, convert and stream audio and video.
*   **yt-dlp:** A command-line program to download videos from YouTube and other video sites.

## Getting Started

To get started, you need to have Docker and Docker Compose installed on your system.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/docker-w-n8n-template.git
    cd docker-w-n8n-template
    ```

2.  **Build and run the container:**

    ```bash
    docker-compose up -d
    ```

3.  **Access N8N:**

    Open your web browser and navigate to `http://localhost:5678` to access the N8N user interface.

## Volumes

The `n8n_data` volume is used to persist N8N data, such as workflows and credentials, across container restarts.

