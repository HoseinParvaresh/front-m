export type AttachmentType = "image" | "video" | "audio" | "file";

export interface Attachment {
  id: string;
  type: AttachmentType;
  name: string;
  src?: string;
  duration?: number;
  size?: number;
  simulated?: boolean;
}

export type MessageStatus = "pending" | "streaming" | "done" | "stopped";

export interface ChatMessage {
  id: number;
  role: "user" | "model";
  text: string;
  attachments: Attachment[];
  status: MessageStatus;
  pendingMedia?: AttachmentType;
  time: string;
  feedback: "like" | "dislike" | null;
}
