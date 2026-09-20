import './App.css'
import couplePhoto from '../images/LVT02675re.jpg'
import bridePhoto from '../images/DSCF3662re.JPG'
import groomPhoto from '../images/LVT02609cr.jpg'
import brideSticker from '../images/sticker/bride-sticker.png'
import groomSticker from '../images/sticker/groom-sticker.png'
import Reserve from "./Reserve.jsx";
import { getGuestFromUrl } from "./Guest.js";

function App() {
  const guest = getGuestFromUrl()

  return (
    <main className="invitation-page">
      <div
        className="photo-backdrop"
        style={{ backgroundImage: `url(${couplePhoto})` }}
        aria-hidden="true"
      />

      <article className="invitation-card">
        <div className="invitation-title">
          <p className="eyebrow">Save &nbsp; The &nbsp;  Date</p>
        </div>

        <div className="portrait-frame">
          <img src={couplePhoto} alt="Cô dâu và chú rể" />
          <div className="portrait-caption" aria-hidden="true">
            <span>In</span><span>timate</span>
            <small>WEDDING</small>
          </div>
        </div>

        <div className="names-block">
          <h1>Thu Hiền <span>&amp;</span> Việt Long</h1>
          <time dateTime="2026-10-31">31.10.2026</time>
        </div>
      </article>

      <article className="family-introduction" aria-labelledby="story-heading">
        <p className="story-heading" id="story-heading">
          Vài năm sau khi gặp nhau, giờ đây chúng mình có một buổi
          tiệc nhỏ để chia sẻ niềm vui của mối nhân duyên này với những người bạn thân thiết.
        </p>

        <div className="couple-introduction">
          <div className="bride-introduction">
            <img className="person-photo bride-photo" src={bridePhoto} alt="Cô dâu Thu Hiền" />
            <div className="person-details bride-details">
              <h2 className="details-title" >Cô dâu:</h2>
              <img className="person-sticker" src={brideSticker} alt="" />
              <p className="person-name">Thu Hiền</p>
            </div>
          </div>


          <div className="groom-introduction">
            <div className="person-details groom-details">
              <h2 className="details-title">Chú rể:</h2>
              <img className="person-sticker" src={groomSticker} alt="" />
              <p className="person-name">Việt Long</p>
            </div>
            <img className="person-photo groom-photo" src={groomPhoto} alt="Chú rể Việt Long" />
          </div>
        </div>
      </article>

      <article className="ceremony-section" aria-labelledby="ceremony-heading">
        <div className="ceremony-visual">
          <h2 className="ceremony-heading" id="ceremony-heading">Thân Mời:</h2>
          <p className="invitation-message">
            <strong className="guest-name">{guest.name}</strong> tới dự buổi tiệc cưới thân mật của <span>{guest.formOfAddress}</span> ♡
          </p>
        </div>
        <p className="ceremony-date">Thời gian:<strong className="guest-name"> 14h - 17h Thứ 7 ngày 31/10/2026 </strong></p>

        <div className="calendar" aria-label="Lịch tháng 10 năm 2026">
          <div className="calendar-header">
            <p className="calendar-month">Tháng 10</p>
            <p className="calendar-year">Năm 2026</p>
          </div>
          <div className="calendar-grid">
            {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day) => (
              <span className="calendar-weekday" key={day}>{day}</span>
            ))}
            <span className="calendar-day calendar-muted">28</span>
            <span className="calendar-day calendar-muted">29</span>
            <span className="calendar-day calendar-muted">30</span>
            {Array.from({ length: 31 }, (_, index) => {
              const day = index + 1
              return (
                <span className={`calendar-day${day === 31 ? ' is-highlighted' : ''}`} key={day}>
                  {day === 31 && <span className="heart-mark">♡</span>}
                  <span>{day}</span>
                </span>
              )
            })}
            <span className="calendar-day calendar-muted">1</span>
          </div>
        </div>
        <p className="ceremony-date">Địa điểm:<strong className="guest-name"> Oho Coffee & Camping BBQ Ecopark </strong></p>
        <p className="ceremony-address">Đ. Thủy Nguyên, Khu đô thị Ecopark, Phụng Công, Hưng Yên, Vietnam </p>
        <div className="map-embed">
          <iframe
            src="https://www.google.com/maps?q=20.9473791,105.9344606&z=17&output=embed"
            title="Bản đồ địa điểm tổ chức tiệc cưới"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <a
          href="https://maps.app.goo.gl/MfKHsDtERqSXukLi7"
          target="_blank"
          rel="noopener noreferrer"
          className="map-direction-btn"
        >
          📍 &nbsp;  Xem đường đi trên Google Maps
        </a>
      </article>

      <Reserve guest={guest} />
    </main>
  )
}

export default App
