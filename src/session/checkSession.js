export default function() {
  const { sid, token } = this.getInstance().getSession();
  return sid && token;
}
