let messageTime;
const hourNow = new Date().getHours()

export function showMessageTime() {
  if (hourNow >= 0 && hourNow < 12) {
    messageTime = 'Bom dia';
  } else if (hourNow >= 12 && hourNow < 18) {
    messageTime = 'Boa tarde';
  } else {
    messageTime = 'Boa noite';
  }

  return messageTime
}