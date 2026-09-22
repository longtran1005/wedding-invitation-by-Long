
import { useEffect, useState } from "react";
import { getGuestFromUrl } from "./Guest.js";

const GOOGLE_SCRIPT_URL =
	"https://script.google.com/macros/s/AKfycbyITJ1IkMnblSXCgRpSnVR5O2qXY4iK7nlaKc0zrwz61zVuL0ZqfKfh3Uu8tOQI1NVn/exec";

function Reserve({ guest: guestProp }) {
	const guest = guestProp || getGuestFromUrl();

	const [attendance, setAttendance] = useState("alone");
	const [companion, setCompanion] = useState("");

	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [submittedStatus, setSubmittedStatus] = useState(null);
	const [checking, setChecking] = useState(true);

	// Kiểm tra RSVP khi vừa mở thiệp
	useEffect(() => {
		async function checkRSVP() {
			if (!guest?.id) {
				setChecking(false);
				return;
			}

			try {
				console.log("[RSVP] Đang kiểm tra:", guest.id);

				const response = await fetch(
					`${GOOGLE_SCRIPT_URL}?guestId=${encodeURIComponent(guest.id)}`
				);

				const responseText = await response.text();

				console.log("[RSVP] Check response:", responseText);

				const result = JSON.parse(responseText);

				if (result.success && result.data) {
					console.log("[RSVP] Guest đã submit:", result.data);

					setSubmitted(true);
					setSubmittedStatus(result.data.attendance);
				} else {
					console.log("[RSVP] Guest chưa submit.");
				}
			} catch (error) {
				console.error("[RSVP] Không thể kiểm tra RSVP:", error);
			} finally {
				setChecking(false);
			}
		}

		checkRSVP();
	}, [guest?.id]);

	async function handleSubmit(event) {
		event.preventDefault();

		if (submitting) {
			return;
		}

		if (attendance === "with-companion" && !companion.trim()) {
			return;
		}

		const payload = {
			guestId: guest.id,
			name: guest.name,
			attendance,
			guests:
				attendance === "with-companion"
					? 2
					: attendance === "alone"
						? 1
						: 0,
			message:
				attendance === "with-companion"
					? companion.trim()
					: "",
		};

		setSubmitting(true);

		try {
			const response = await fetch(GOOGLE_SCRIPT_URL, {
				method: "POST",
				body: JSON.stringify(payload),
			});

			const responseText = await response.text();
			const result = JSON.parse(responseText);

			if (result.success) {
				console.log("[RSVP] Gửi thành công:", result);

				// Chuyển trạng thái UI ngay lập tức
				setSubmitted(true);

				setSubmittedStatus(attendance);
			} else {
				console.error("[RSVP] Apps Script trả về lỗi:", result);
				alert("Có lỗi xảy ra. Bạn thử lại nhé!");
			}
		} catch (error) {
			console.error("[RSVP] Request thất bại:", error);
			alert("Không thể gửi thông tin. Bạn thử lại nhé!");
		} finally {
			setSubmitting(false);
		}
	}

	// Đang kiểm tra trạng thái
	if (checking) {
		return (
			<section className="rsvp reveal-diagonal" data-reveal="diagonal">
				<p>Đang kiểm tra thông tin xác nhận...</p>
			</section>
		);
	}

	// Đã submit
	if (submitted) {
		return (
			<section className="rsvp reveal-diagonal" data-reveal="diagonal">
				<h2>Cảm ơn {guest.name} ❤️</h2>

				{submittedStatus === "no" ? (
					<p class="story-heading">
						Chúng mình đã nhận được xác nhận của bạn.
						<br />
						Rất tiếc lần này không gặp được bạn, hẹn dịp khác nhé!
					</p>
				) : (
					<p class="story-heading">
						Chúng mình đã nhận được xác nhận của bạn.
						<br />
						Hẹn gặp bạn trong bữa tiệc nhé! 🎉
					</p>
				)}
			</section>
		);
	}

	// Chưa submit → hiện form
	return (
		<section className="rsvp reveal-diagonal" data-reveal="diagonal">
			<h2>Xác nhận tham dự</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor="guest-name">Tên của bạn</label>

				<input
					id="guest-name"
					name="name"
					type="text"
					value={guest.name}
					disabled
				/>

				<fieldset>
					<legend>Bạn có tới tham dự không?</legend>

					<label className="attendance-option">
						<input
							type="radio"
							name="attendance"
							value="no"
							checked={attendance === "no"}
							onChange={(event) =>
								setAttendance(event.target.value)
							}
						/>
						Bận quá, không tham dự được 😢
					</label>

					<label className="attendance-option">
						<input
							type="radio"
							name="attendance"
							value="alone"
							checked={attendance === "alone"}
							onChange={(event) =>
								setAttendance(event.target.value)
							}
						/>
						Một mình tới dự 🎉
					</label>

					<label className="attendance-option">
						<input
							type="radio"
							name="attendance"
							value="with-companion"
							checked={attendance === "with-companion"}
							onChange={(event) =>
								setAttendance(event.target.value)
							}
						/>
						Đi cùng với người đi cùng 👫
					</label>
				</fieldset>

				{attendance === "with-companion" && (
					<label htmlFor="companion">
						Hãy cho chúng mình biết tên người đi cùng, và giới
						thiệu ngắn gọn nếu có thể để chúng mình có thể tiếp
						đón tốt hơn

						<textarea
							id="companion"
							name="companion"
							value={companion}
							onChange={(event) =>
								setCompanion(event.target.value)
							}
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