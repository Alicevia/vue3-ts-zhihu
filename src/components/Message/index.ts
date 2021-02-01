import { createApp } from 'vue'
import Message from './Message.vue'
type MessageProp = "success" | "error" | "default";
export default (type: MessageProp, message: string, timeout = 2000) => {
  const messageInstance = createApp(Message, {
    message, type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)
  console.log(messageInstance)
  setTimeout(() => {
    messageInstance.unmount(mountNode)
    document.body.removeChild(mountNode)
  }, timeout);
}