## Instruções da Requisição para o Serviço Whisper

Este documento descreve como fazer requisições ao serviço Whisper (`onerahmet/openai-whisper-asr-webservice`) que está rodando em um contêiner Docker separado.

---

### Endpoint

O endpoint para a transcrição é:

`http://whisper:9000/asr`

(Dentro da rede Docker, use `whisper`. Se estiver acessando de fora do Docker, use `localhost:9000` ou a porta mapeada).

---

### Método

`POST`

---

### Content-Type

`multipart/form-data`

---

### Corpo da Requisição (Form Data)

Você deve enviar o arquivo de áudio ou vídeo como um campo de formulário. O nome do campo para o arquivo é geralmente `file` ou `audio_file`.

---

### Parâmetros de Consulta (Query Parameters)

Você pode configurar a transcrição adicionando os seguintes parâmetros à URL:

*   **`output`**: Formato de saída desejado. Valores aceitos: `text`, `json`, `vtt`, `srt`, `tsv`. Padrão: `text`.
*   **`task`**: Tipo de tarefa a ser executada. Opções: `transcribe` (transcrever no idioma de origem) ou `translate` (traduzir para o inglês).
*   **`language`**: Código do idioma de origem do áudio (ex: `en` para inglês, `pt` para português). Se não for fornecido, o serviço tentará reconhecer automaticamente o idioma.
*   **`word_timestamps`**: `true` ou `false`. Ativa timestamps em nível de palavra. (Disponível com o motor Faster Whisper). Padrão: `false`.
*   **`vad_filter`**: `true` ou `false`. Ativa a detecção de atividade de voz (Voice Activity Detection - VAD). (Disponível com o motor Faster Whisper). Padrão: `false`.
*   **`encode`**: `true` ou `false`. Indica se o áudio deve ser codificado via FFmpeg antes do processamento. Padrão: `true`.
*   **`diarize`**: `true` ou `false`. Ativa a diarização de locutor (separação de falantes). (Disponível com o motor WhisperX). Padrão: `false`.
*   **`min_speakers`**: Número inteiro. Especifica o número mínimo de locutores para diarização (apenas WhisperX).
*   **`max_speakers`**: Número inteiro. Especifica o número máximo de locutores para diarização (apenas WhisperX).

---

### Exemplo de Requisição usando `curl`

```bash
curl -X POST "http://whisper:9000/asr?output=json&task=transcribe&language=pt" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "audio_file=@/caminho/para/seu/audio.mp3"
```

---

### Documentação Interativa

Para uma documentação interativa completa (Swagger UI), acesse:

`http://localhost:9000/docs`

(Certifique-se de que o contêiner do Whisper esteja em execução e a porta 9000 esteja mapeada para `localhost`).
