export const guests = [
  {
    id: "nguyet-anh",
    name: "Nguyệt Anh",
    wish: "Chúc bạn có một buổi tiệc thật vui và nhiều kỷ niệm đẹp cùng chúng mình!",
  },
  {
    id: "test-guest",
    name: "Khách mời thử nghiệm",
    wish: "hy vọng là works",
  },
]

export function getGuestFromUrl() {
  const pathGuestId = decodeURIComponent(window.location.pathname)
    .split("/")
    .filter(Boolean)[0]
  const params = new URLSearchParams(window.location.search)
  const guestId = pathGuestId || params.get("guestId") || params.get("id") || params.get("guest")
  const guest = guests.find((item) => item.id === guestId)

  return guest || {
    id: guestId || "unknown",
    name: "Khách mời",
    wish: "",
  }
}
