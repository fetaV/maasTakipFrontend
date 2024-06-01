import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  FaWallet,
  FaChartLine,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa"

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="jumbotron text-center p-5 bg-primary text-white">
        <div className="container">
          <h1 className="jumbotron-heading">
            50-30-20 Para Yönetim Uygulaması
          </h1>
          <p className="lead">
            Maaşınızı daha iyi yönetmenizi sağlayan uygulama. İhtiyaçlarınızı,
            yatırımlarınızı ve lüks harcamalarınızı düzenleyin.
          </p>
          <p>
            <a href="/" className="btn btn-light btn-lg mx-2">
              Uygulamayı Kullan
            </a>
            <a href="/" className="btn btn-outline-light btn-lg mx-2">
              Daha Fazla Bilgi
            </a>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 p-1">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <FaWallet size={50} className="mb-3 text-primary" />
                <h4 className="card-title">Harcamalarınızı Yönetin</h4>
                <p className="card-text">
                  Aylık gelirinizin %50'sini ihtiyaçlarınıza, %30'unu lüks
                  harcamalarınıza ve %20'sini yatırımlarınıza ayırın.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-1">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <FaMoneyBillWave size={50} className="mb-3 text-success" />
                <h4 className="card-title">Borç Takibi</h4>
                <p className="card-text">
                  Borçlarınızı kaydedin ve ödemelerinizi düzenli olarak takip
                  edin.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 p-1">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <FaChartLine size={50} className="mb-3 text-info" />
                <h4 className="card-title">Yatırımlarınızı Planlayın</h4>
                <p className="card-text">
                  Yatırımlarınızı kolayca takip edin ve finansal hedeflerinize
                  ulaşın.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-4">Nasıl Çalışır?</h2>
          <div className="row text-center">
            <div className="col-md-4 p-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <FaCheckCircle size={50} className="mb-3 text-success" />
                  <h4 className="card-title">Adım 1: Maaşınızı Girin</h4>
                  <p className="card-text">
                    Maaşınızı sisteme girerek gelirinizi hesaplayın.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <FaCheckCircle size={50} className="mb-3 text-success" />
                  <h4 className="card-title">Adım 2: Kategorilere Ayırın</h4>
                  <p className="card-text">
                    Gelirinizi ihtiyaçlar, lüks harcamalar ve yatırımlar olarak
                    kategorilere ayırın.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <FaCheckCircle size={50} className="mb-3 text-success" />
                  <h4 className="card-title">Adım 3: Takip Edin</h4>
                  <p className="card-text">
                    Harcamalarınızı ve yatırımlarınızı düzenli olarak takip
                    edin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4">Müşteri Yorumları</h2>
          <div className="row text-center">
            <div className="col-md-4 p-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-text">
                    "50-30-20 uygulaması sayesinde harcamalarımı çok daha iyi
                    yönetiyorum. Tavsiye ederim!"
                  </p>
                  <h5 className="card-title">- Ayşe K.</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-text">
                    "Bu uygulama ile yatırım yapmayı öğrendim ve finansal
                    hedeflerime ulaştım."
                  </p>
                  <h5 className="card-title">- Mehmet T.</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-1">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <p className="card-text">
                    "Borçlarımı takip etmek hiç bu kadar kolay olmamıştı.
                    Teşekkürler!"
                  </p>
                  <h5 className="card-title">- Zeynep A.</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-primary text-white text-center py-5">
        <div className="container">
          <h2 className="mb-4">Hemen Başlayın</h2>
          <p className="lead mb-4">
            Finansal özgürlüğünüz için ilk adımı atın.
          </p>
          <a href="/" className="btn btn-light btn-lg mx-2">
            Şimdi Üye Olun
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4">
        <div className="container">
          <p>&copy; 2024 50-30-20 Para Yönetim Uygulaması</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
