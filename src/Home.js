import React from "react"

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">
            50-30-20 Para Yönetim Uygulaması
          </h1>
          <p className="lead text-muted">
            Maaşınızı daha iyi yönetmenizi sağlayan uygulama. İhtiyaçlarınızı,
            yatırımlarınızı ve lüks harcamalarınızı düzenleyin.
          </p>
          <p>
            <a href="/" className="btn btn-primary my-2">
              Uygulamayı Kullan
            </a>
            <a href="/" className="btn btn-secondary my-2">
              Daha Fazla Bilgi
            </a>
          </p>
        </div>
      </section>

      {/* Features Section */}
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h2>Harcamalarınızı Yönetin</h2>
            <p>
              Aylık gelirinizin %50'sini ihtiyaçlarınıza, %30'unu lüks
              harcamalarınıza ve %20'sini yatırımlarınıza ayırın.
            </p>
          </div>
          <div className="col-md-4">
            <h2>Borç Takibi</h2>
            <p>
              Borçlarınızı kaydedin ve ödemelerinizi düzenli olarak takip edin.
            </p>
          </div>
          <div className="col-md-4">
            <h2>Yatırımlarınızı Planlayın</h2>
            <p>
              Yatırımlarınızı kolayca takip edin ve finansal hedeflerinize
              ulaşın.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-muted text-center py-4">
        <div className="container">
          <p>&copy; 2024 50-30-20 Para Yönetim Uygulaması</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
