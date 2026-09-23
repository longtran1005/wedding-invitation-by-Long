import { useEffect } from 'react'
import './App.css'
import couplePhoto from '../images/LVT02675re.jpg'
import couplePhoto2 from '../images/LVT02483re.jpg'
import bridePhoto from '../images/DSCF3662re.PNG'
import groomPhoto from '../images/LVT02609cr.jpg'
import brideSticker from '../images/sticker/bride-sticker.png'
import groomSticker from '../images/sticker/groom-sticker.png'
import flower1 from '../images/flower/flower1.png'
import flower2 from '../images/flower/flower2.png'
import flower3 from '../images/flower/flower3.png'
import Reserve from "./Reserve.jsx";
import { getGuestFromUrl } from "./Guest.js";

function App() {
  const guest = getGuestFromUrl()

  useEffect(() => {
    const revealItems = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -16% 0px' },
    )

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <main className="invitation-page">
      <div
        className="photo-backdrop"
        style={{ backgroundImage: `url(${couplePhoto})` }}
        aria-hidden="true"
      />

      <article className="invitation-card reveal-item" data-reveal>
        <div className="invitation-title">
          <p className="eyebrow">Save &nbsp; The &nbsp;  Date</p>
        </div>

        <div className="portrait-frame">
          {/* <img src={couplePhoto} alt="Cô dâu và chú rể" /> */}
          <img src={couplePhoto2} alt="Cô dâu và chú rể" data-reveal="image" />
          {/* <div className="portrait-caption" aria-hidden="true">
            <span>In</span><span>timate</span>
            <small>WEDDING</small>
          </div> */}
        </div>

        <div className="names-block">
          <h1>Thu Hiền <span>&amp;</span> Việt Long</h1>
          <time dateTime="2026-10-31">31.10.2026</time>
        </div>
      </article>

      <article className="family-introduction reveal-item" data-reveal aria-labelledby="story-heading">
        <div className="story-heading-wrap" data-reveal="diagonal">
          <img className="story-flower story-flower-left" src={flower2} alt="" data-reveal="flower" />
          <img className="story-flower story-flower-right" src={flower2} alt="" data-reveal="flower" />
          <img className="story-flower story-flower-bottom" src={flower3} alt="" data-reveal="flower" />
          <p className="story-heading" id="story-heading">
            Chúng mình đã gặp nhau từ vài năm trước, 
             buổi tiệc nhỏ này là để đánh dấu chặng đường ấy,
             cũng như chia sẻ niềm vui "kết đôi" này cùng những người bạn thân thiết.
          </p>
        </div>

        <div className="couple-introduction">
          <div className="bride-introduction">
            <img className="person-photo bride-photo" src={bridePhoto} alt="Cô dâu Thu Hiền" data-reveal="image" />
            <div className="person-details bride-details">
              <h2 className="details-title" >Cô dâu:</h2>
              <img className="person-sticker" src={brideSticker} alt="" data-reveal="image" />
              <p className="person-name" data-reveal="image">Thu Hiền</p>
            </div>
          </div>


          <div className="groom-introduction">
            <div className="person-details groom-details">
              <h2 className="details-title">Chú rể:</h2>
              <img className="person-sticker" src={groomSticker} alt="" data-reveal="image" />
              <p className="person-name" data-reveal="image">Việt Long</p>
            </div>
            <img className="person-photo groom-photo" src={groomPhoto} alt="Chú rể Việt Long" data-reveal="image" />
          </div>
        </div>
      </article>

      <article className="ceremony-section reveal-item" data-reveal aria-labelledby="ceremony-heading">
        <div className="ceremony-visual">
          <h2 className="ceremony-heading" id="ceremony-heading">Thân Mời:</h2>
          <strong className="guest-name">{guest.name}</strong>
          <p className="story-heading">
             tới dự buổi tiệc cưới thân mật của <span>{guest.formOfAddress}</span> ♡
          </p>
        </div>
        <p className="ceremony-date">Thời gian:<strong className="date-time"> 14h - 17h Thứ 7 ngày 31/10/2026 </strong></p>

        <div className="calendar" data-reveal="diagonal" aria-label="Lịch tháng 10 năm 2026">
          <div className="calendar-header">
            <p className="calendar-month">Tháng 10</p>
            <p className="calendar-month">2026</p>
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
        <p className="ceremony-date">Địa điểm:<strong className="date-time"> Oho Coffee & Camping BBQ Ecopark </strong></p>
        <p className="ceremony-address">Đ. Thủy Nguyên, Khu đô thị Ecopark, Phụng Công, Hưng Yên, Vietnam </p>
        <div className="map-embed" data-reveal="diagonal">
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
