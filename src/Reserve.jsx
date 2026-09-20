import { useState } from "react";
import { getGuestFromUrl } from "./Guest.js";

const GOOGLE_SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbyITJ1IkMnblSXCgRpSnVR5O2qXY4iK7nlaKc0zrwz61zVuL0ZqfKfh3Uu8tOQI1NVn/exec";

function Reserve({ guest: guestProp }) {
	const guest = guestProp || getGuestFromUrl();
	const [attendance, setAttendance] = useState("alone");
	const [companion, setCompanion] = useState("");

	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();

		console.groupCollapsed("[RSVP] Bắt đầu gửi xác nhận");
		console.log("Guest:", guest);
		console.log("Trạng thái tham dự:", attendance);
		console.log("Có người đi cùng:", Boolean(companion.trim()));
		console.groupEnd();

		if (submitting) {
			console.warn("[RSVP] Bỏ qua vì request trước đó vẫn đang được gửi.");
			return;
		}

		if (attendance === "with-companion" && !companion.trim()) {
			console.warn("[RSVP] Thiếu thông tin người đi cùng.");
			return;
		}

		const payload = {
			guestId: guest.id,
			name: guest.name,
			attendance,
			guests: attendance === "with-companion" ? 2 : attendance === "alone" ? 1 : 0,
			message: attendance === "with-companion" ? companion.trim() : "",
		};

		setSubmitting(true);
		console.log("[RSVP] Payload gửi đi:", payload);
		console.log("[RSVP] Endpoint:", GOOGLE_SCRIPT_URL);

		try {
			const response = await fetch(GOOGLE_SCRIPT_URL, {
				method: "POST",
				body: JSON.stringify(payload),
			});

			console.log("[RSVP] HTTP response:", {
				status: response.status,
				statusText: response.statusText,
				ok: response.ok,
				redirected: response.redirected,
				url: response.url,
				contentType: response.headers.get("content-type"),
			});

		const responseText = await response.text();
		console.log("[RSVP] Raw response:", responseText);

		let result;
		try {
			result = JSON.parse(responseText);
		} catch (parseError) {
			console.error("[RSVP] Response không phải JSON hợp lệ:", parseError);
			throw new Error(`Response không hợp lệ (HTTP ${response.status})`);
		}

			if (result.success) {
				console.log("[RSVP] Gửi thành công:", result);
				setSubmitted(true);
			} else {
				console.error("[RSVP] Apps Script trả về lỗi:", result);
				alert("Có lỗi xảy ra. Bạn thử lại nhé!");
			}
		} catch (error) {
			console.error("[RSVP] Request thất bại:", {
				name: error.name,
				message: error.message,
				stack: error.stack,
				error,
			});
			alert("Không thể gửi thông tin. Bạn thử lại nhé!");
		} finally {
			setSubmitting(false);
		}
	}

	if (submitted) {
		return (
			<section className="rsvp">
				<h2>Cảm ơn {guest.name} ❤️</h2>

				<p>
					Chúng mình đã nhận được xác nhận của bạn.
					<br />
					Hẹn gặp bạn trong bữa tiệc nhé!
				</p>
				{guest.wish && <p>{guest.wish}</p>}
			</section>
		);
	}

	return (
		<section className="rsvp">
			<h2>Xác nhận tham dự</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor="guest-name">Tên của bạn</label>
				<input id="guest-name" name="name" type="text" value={guest.name} disabled />

				<fieldset>
					<legend>Bạn có tới tham dự không? </legend>

					<label className="attendance-option">
						<input
							type="radio"
							name="attendance"
							value="no"
							checked={attendance === "no"}
							onChange={(event) => setAttendance(event.target.value)}
						/>
						Không đến được
					</label>
					<label className="attendance-option">
						<input
							type="radio"
							name="attendance"
							value="alone"
							checked={attendance === "alone"}
							onChange={(event) => setAttendance(event.target.value)}
						/>
						Đi một mình
					</label>
					<label className="attendance-option">
						<input
							type="radio"
							name="attendance"
							value="with-companion"
							checked={attendance === "with-companion"}
							onChange={(event) => setAttendance(event.target.value)}
						/>
						Đi với 1 người đính kèm nữa
					</label>
				</fieldset>

				{attendance === "with-companion" && (
					<label htmlFor="companion">
						Hãy cho chúng mình biết tên người đi cùng, và giới thiệu ngắn gọn nếu có thể để chúng mình có thể tiếp đón tốt hơn
						<textarea
							id="companion"
							name="companion"
							value={companion}
							onChange={(event) => setCompanion(event.target.value)}
							placeholder="(Tên, mối quan hệ, giới thiệu ngắn gọn)"
							required
						/>
					</label>
				)}


				<button type="submit" disabled={submitting}>
					{submitting ? "Đang gửi..." : "Xác nhận"}
				</button>
			</form>
		</section>
	);
}

export default Reserve;