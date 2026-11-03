function readDuration(src: string, type: "video" | "audio"): Promise<number> {
  return new Promise((resolve) => {
    const el = document.createElement(type);
    el.preload = "metadata";
    el.onloadedmetadata = () =>
      resolve(Number.isFinite(el.duration) ? Math.round(el.duration) : 0);
    el.onerror = () => resolve(0);
    el.src = src;
  });
}

function typeOf(file: File): AttachmentType {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  return "file";
}

export function useAttachments() {
  const counter = useState("playground-attachment-counter", () => 0);
  const nextId = () => `att-${++counter.value}`;

  function fromFile(file: File): Attachment {
    const type = typeOf(file);
    const attachment = reactive<Attachment>({
      id: nextId(),
      type,
      name: file.name,
      src: URL.createObjectURL(file),
      size: file.size,
    });
    if ((type === "video" || type === "audio") && attachment.src) {
      readDuration(attachment.src, type).then((seconds) => {
        attachment.duration = seconds;
      });
    }
    return attachment;
  }

  function fromRecording(blob: Blob, seconds: number): Attachment {
    return {
      id: nextId(),
      type: "audio",
      name: "voice-message.webm",
      src: URL.createObjectURL(blob),
      duration: seconds,
      size: blob.size,
    };
  }

  function sample(type: "image" | "video" | "audio"): Attachment {
    if (type === "image")
      return {
        id: nextId(),
        type,
        name: "img-gen.jpg",
        src: "/simple-media/img-gen.jpg",
        simulated: true,
      };
    if (type === "video")
      return {
        id: nextId(),
        type,
        name: "video-gen.mp4",
        src: "/simple-media/video-gen.mp4",
        duration: 12,
        simulated: true,
      };
    return {
      id: nextId(),
      type,
      name: "/simple-media/ai_answer.mp3",
      duration: 9,
      simulated: true,
    };
  }

  return { nextId, fromFile, fromRecording, sample };
}
