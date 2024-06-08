import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FaPen, FaAngleUp, FaAngleDown } from "react-icons/fa6"

function Harcama() {
  const [maaslar, setMaaslar] = useState([])
  const [maasMiktari, setMaasMiktari] = useState("")
  const [newMaas, setNewMaas] = useState("")
  const [miktar, setMiktar] = useState("")
  const [harcama, setHarcama] = useState("")
  const [modalMiktar, setModalMiktar] = useState("")
  const [modalHarcama, setModalHarcama] = useState("")
  const [modalKullanim, setModalKullanim] = useState()
  const [harcamalar, setHarcamalar] = useState([])
  const [maasToEdit, setMaasToEdit] = useState(null)
  const [harcamaToEdit, setHarcamaToEdit] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDate, setSelectedDate] = useState(null)
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" })
  const [selectedOption, setSelectedOption] = useState(
    "Harcama seçeneği seçiniz"
  )
  const [selectedOptionModal, setSelectedOptionModal] = useState(
    "Harcama seçeneği seçiniz"
  )

  const toplamBorc = harcamalar
    .filter(harcama => harcama.kullanim === 3)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const yatirimMiktari =
    maaslar.length > 0 ? (maaslar[0].maasMiktari - toplamBorc) * 0.2 : 0
  const luksMiktari =
    maaslar.length > 0 ? (maaslar[0].maasMiktari - toplamBorc) * 0.3 : 0
  const ihtiyacMiktari =
    maaslar.length > 0 ? (maaslar[0].maasMiktari - toplamBorc) * 0.5 : 0

  const toplamIhtiyac = harcamalar
    .filter(harcama => harcama.kullanim === 0)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const toplamYatirim = harcamalar
    .filter(harcama => harcama.kullanim === 1)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const toplamLuks = harcamalar
    .filter(harcama => harcama.kullanim === 2)
    .reduce((acc, harcama) => acc + harcama.miktar, 0)

  const handleDateSelect = date => {
    setSelectedDate(date)
  }

  const formatDate = dateStr => {
    if (!dateStr) return "Geçersiz tarih"
    const date = new Date(dateStr)
    if (isNaN(date)) return "Geçersiz tarih"
    const options = { day: "numeric", month: "long", year: "numeric" }
    return new Intl.DateTimeFormat("tr-TR", options).format(date)
  }

  const handleSort = key => {
    let direction = "descending"
    if (sortConfig.key === key && sortConfig.direction === "descending") {
      direction = "ascending"
    }
    setSortConfig({ key, direction })
  }

  const sortedHarcamalar = [...harcamalar].sort((a, b) => {
    if (sortConfig.key) {
      let aValue, bValue
      if (sortConfig.key === "ihtiyac") {
        aValue = a.kullanim === 0 ? a.miktar : 0
        bValue = b.kullanim === 0 ? b.miktar : 0
      } else if (sortConfig.key === "yatirim") {
        aValue = a.kullanim === 1 ? a.miktar : 0
        bValue = b.kullanim === 1 ? b.miktar : 0
      } else if (sortConfig.key === "lux") {
        aValue = a.kullanim === 2 ? a.miktar : 0
        bValue = b.kullanim === 2 ? b.miktar : 0
      } else if (sortConfig.key === "Borç") {
        aValue = a.kullanim === 3 ? a.miktar : 0
        bValue = b.kullanim === 3 ? b.miktar : 0
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    }
    return 0
  })

  const getSortIcon = key => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaAngleUp />
      ) : (
        <FaAngleDown />
      )
    }
    return null
  }

  const filteredHarcamalar = sortedHarcamalar.filter(
    harcama =>
      (!selectedDate || formatDate(harcama.updatedAt) === selectedDate) &&
      harcama.aciklama.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const harcamaEditModalOpen = userId => {
    const modalEdit = harcamalar.find(modal => modal._id === userId)
    setModalMiktar(modalEdit.miktar)
    setModalHarcama(modalEdit.aciklama)
    setModalKullanim(modalEdit.kullanim)
    setHarcamaToEdit(modalEdit)

    let kullanimText
    if (modalEdit.kullanim === 0) {
      kullanimText = "İhtiyaç"
    } else if (modalEdit.kullanim === 1) {
      kullanimText = "Yatırım"
    } else if (modalEdit.kullanim === 2) {
      kullanimText = "Lüks"
    } else if (modalEdit.kullanim === 3) {
      kullanimText = "Borç"
    }
    setSelectedOptionModal(kullanimText)
  }

  const harcamaDeleteModalOpen = userId => {
    setDeleteId(userId)
  }

  const kullanimOptionSelect = option => {
    setSelectedOption(option)
  }
  const kullanimOptionSelectModal = option => {
    setSelectedOptionModal(option)

    let kullanimValue
    if (option === "İhtiyaç") {
      kullanimValue = 0
    } else if (option === "Yatırım") {
      kullanimValue = 1
    } else if (option === "Lüks") {
      kullanimValue = 2
    } else if (option === "Borç") {
      kullanimValue = 3
    }
    setModalKullanim(kullanimValue)
  }

  const harcamaKaydet = async e => {
    e.preventDefault()

    let kullanimTipi
    if (selectedOption === "İhtiyaç") {
      kullanimTipi = 0
    } else if (selectedOption === "Yatırım") {
      kullanimTipi = 1
    } else if (selectedOption === "Lüks") {
      kullanimTipi = 2
    } else if (selectedOption === "Borç") {
      kullanimTipi = 3
    }

    const data = {
      aciklama: harcama,
      kullanim: kullanimTipi,
      miktar: parseInt(miktar, 10),
    }

    try {
      const token = localStorage.getItem("token")

      const response = await axios.post(
        "https://maastakipbackend.onrender.com/api/harcama",
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      console.log("response", response)
      setHarcamalar([...harcamalar, response.data])
      toast.success("Harcama eklendi!")
      setHarcama("")
      setMiktar("")
      setSelectedOption("Harcama seçeneği seçiniz")
    } catch (error) {
      console.error("Error saving the data", error)
    }
  }

  const editMaasModalOpen = maas => {
    console.log("bumodal")
    setMaasToEdit(maas)
    setNewMaas(maas.maasMiktari - toplamBorc)
  }
  const editMaasSave = async () => {
    if (!maasToEdit) {
      console.error("maasToEdit is not set")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await axios.put(
        `https://maastakipbackend.onrender.com/api/maas/${maasToEdit._id}`,
        { maasMiktari: newMaas },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      console.log(response)
      toast.success("User updated successfully!")
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error(error.response.data)
      toast.error(error.response.data.message)
    }
  }

  const editHarcamaSaveModal = async () => {
    if (!harcamaToEdit) {
      console.error("harcamaToEdit is not set")
      return
    }

    try {
      const token = localStorage.getItem("token")
      const data = {
        aciklama: modalHarcama,
        kullanim: modalKullanim,
        miktar: parseInt(modalMiktar, 10),
      }

      const response = await axios.put(
        `https://maastakipbackend.onrender.com/api/harcama/${harcamaToEdit._id}`,
        data,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setHarcamalar(
        harcamalar.map(harcama =>
          harcama._id === harcamaToEdit._id ? response.data : harcama
        )
      )
      toast.success("Harcama başarıyla güncellendi!")
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error(error.response.data)
      toast.error("Harcama güncellenirken bir hata oluştu.")
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios
      .get("https://maastakipbackend.onrender.com/api/maas", {
        headers: {
          Authorization: token,
        },
      })
      .then(res => setMaaslar(res.data))
      .catch(err => console.error(err))

    axios
      .get("https://maastakipbackend.onrender.com/api/harcama", {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log("data", res.data)
        setHarcamalar(res.data)
      })
      .catch(err => console.error(err))
  }, [])

  const maasKaydet = async e => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "https://maastakipbackend.onrender.com/api/maas",
        {
          maasMiktari,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setMaaslar([...maaslar, response.data])
      setMaasMiktari("")
    } catch (err) {
      console.error(err)
    }
  }

  const harcamaSil = async userId => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(
        `https://maastakipbackend.onrender.com/api/harcama/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      setHarcamalar(harcamalar.filter(harcama => harcama._id !== userId))
      toast.success("Harcama başarıyla silindi!")
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error(
        "Hata mesajı:",
        error.response?.data?.message || error.message
      )
      toast.error("Harcama silinirken bir hata oluştu.")
    }
  }

  return (
    <div className="container mt-5">
      <ToastContainer />

      <div className="row">
        <div className="col-md-3">
          <h3>Parasal Düzenlemeler</h3>
          <form className="mt-3">
            {!maaslar.some(maas => maas.maasMiktari) && (
              <div className="form-group mt-3 border rounded p-3 mb-3">
                <label htmlFor="typeRepsX" className="form-label">
                  Maaşınızı Giriniz
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="typeRepsX"
                  placeholder="Maaş"
                  value={maasMiktari}
                  required
                  onChange={e => setMaasMiktari(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={maasKaydet}
                  className="btn btn-primary mt-3"
                >
                  Save
                </button>
              </div>
            )}
            <div className="border rounded p-3 mb-3">
              <form>
                <div className="form-group mt-3">
                  <label htmlFor="harcama" className="form-label">
                    Açıklama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="harcama"
                    value={harcama}
                    onChange={e => setHarcama(e.target.value)}
                    placeholder="Açıklama giriniz"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="typeTitleX" className="form-label">
                    Kullanım
                  </label>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle w-100 text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedOption}
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelect("İhtiyaç")}
                        >
                          İhtiyaç
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelect("Yatırım")}
                        >
                          Yatırım
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelect("Lüks")}
                        >
                          Lüks
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelect("Borç")}
                        >
                          Borç
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="miktar" className="form-label">
                    Miktar
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="miktar"
                    value={miktar}
                    onChange={e => setMiktar(e.target.value)}
                    placeholder="Miktar"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={harcamaKaydet}
                  className="btn btn-primary mt-3"
                >
                  Save
                </button>
              </form>
            </div>
          </form>
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Harcama Tablosu</h3>
            {maaslar.map((maas, index) => (
              <h4
                key={index}
                className="btn btn-info d-flex justify-content-center align-items-center"
                data-bs-toggle="modal"
                data-bs-target="#maasEditModal"
                onClick={() => editMaasModalOpen(maas)}
              >
                Toplam Maaş Miktarı: {maas.maasMiktari - toplamBorc}
                <FaPen className="ms-2" />
              </h4>
            ))}
          </div>
          <ul className="list-group mt-1">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              <table className="table">
                <thead>
                  <tr>
                    <th className="border border-0">
                      <div className="dropdown">
                        <button
                          className="btn btn-secondary dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          Tarih Seçiniz
                        </button>
                        <ul className="dropdown-menu">
                          {filteredHarcamalar
                            .reduce((uniqueDates, harcama) => {
                              const formattedDate = formatDate(
                                harcama.updatedAt
                              )
                              if (!uniqueDates.includes(formattedDate)) {
                                uniqueDates.push(formattedDate)
                              }
                              return uniqueDates
                            }, [])
                            .map((uniqueDate, index) => (
                              <li key={index}>
                                <div
                                  className="dropdown-item"
                                  onClick={() => handleDateSelect(uniqueDate)}
                                >
                                  {uniqueDate}
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </th>

                    <th className="border border-0">
                      <input
                        className="form-control mt-2"
                        type="search"
                        placeholder="Ara"
                        aria-label="Search"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th>Açıklama</th>
                    <th
                      onClick={() => handleSort("ihtiyac")}
                      style={{ width: "15%" }}
                    >
                      <button className="btn p-0 m-0 border-0">
                        <b> İhtiyaç</b> {getSortIcon("ihtiyac")}
                      </button>
                    </th>
                    <th
                      onClick={() => handleSort("yatirim")}
                      style={{ width: "15%" }}
                    >
                      <button className="btn p-0 m-0 border-0">
                        <b>Yatırım</b> {getSortIcon("yatirim")}
                      </button>
                    </th>
                    <th
                      onClick={() => handleSort("lux")}
                      style={{ width: "15%" }}
                    >
                      <button className="btn p-0 m-0 border-0">
                        <b> Lüks</b> {getSortIcon("lux")}
                      </button>
                    </th>
                    <th
                      onClick={() => handleSort("Borç")}
                      style={{ width: "15%" }}
                    >
                      <button className="btn p-0 m-0 border-0">
                        <b>Borç</b>
                        {getSortIcon("Borç")}
                      </button>
                    </th>
                    <th>Aksiyon</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHarcamalar.map((harcama, index) => (
                    <tr key={index}>
                      <td data-title="Harcama Seçeneği">
                        {harcama.aciklama} <br />
                        {harcama.createdAt === harcama.updatedAt ? (
                          <div
                            className="text-secondary"
                            style={{ fontSize: "11px" }}
                          >
                            Oluşturma Tarihi:{formatDate(harcama.createdAt)}
                          </div>
                        ) : (
                          <div
                            className="text-secondary"
                            style={{ fontSize: "11px" }}
                          >
                            Düzenleme Tarihi:{formatDate(harcama.updatedAt)}
                          </div>
                        )}
                      </td>
                      {harcama.kullanim === 0 ? (
                        <>
                          <td data-title="İhtiyaç">{harcama.miktar}</td>
                          <td data-title="Yatırım" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Lüks" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Borç" className="text-danger">
                            <b>0</b>
                          </td>
                        </>
                      ) : harcama.kullanim === 1 ? (
                        <>
                          <td data-title="İhtiyaç" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Yatırım">{harcama.miktar}</td>
                          <td data-title="Lüks" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Borç" className="text-danger">
                            <b>0</b>
                          </td>
                        </>
                      ) : harcama.kullanim === 2 ? (
                        <>
                          <td data-title="İhtiyaç" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Yatırım" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Lüks">{harcama.miktar}</td>
                          <td data-title="Borç" className="text-danger">
                            <b>0</b>
                          </td>
                        </>
                      ) : (
                        <>
                          <td data-title="İhtiyaç" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Yatırım" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Lüks" className="text-danger">
                            <b>0</b>
                          </td>
                          <td data-title="Borç">{harcama.miktar}</td>
                        </>
                      )}
                      <td data-title="Aksiyon">
                        <button
                          className="btn btn-warning me-2 text-white"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                          onClick={() => harcamaEditModalOpen(harcama._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          data-bs-toggle="modal"
                          data-bs-target="#deleteModal"
                          onClick={() => harcamaDeleteModalOpen(harcama._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <b>Toplam Harcanan Tutar</b>
                    </td>
                    <td data-title="İhtiyaç">{toplamIhtiyac}</td>
                    <td data-title="Yatırım">{toplamYatirim}</td>
                    <td data-title="Lüks">{toplamLuks}</td>
                    <td data-title="Borç">{toplamBorc}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>Kalan Tutar</b>
                    </td>
                    <td
                      data-title="Kalan İhtiyaç Tutarı"
                      style={
                        ihtiyacMiktari - toplamIhtiyac < 0
                          ? { color: "red" }
                          : {}
                      }
                    >
                      {ihtiyacMiktari - toplamIhtiyac}
                    </td>
                    <td
                      data-title="Kalan Yatırım Tutarı"
                      style={
                        yatirimMiktari - toplamYatirim < 0
                          ? { color: "red" }
                          : {}
                      }
                    >
                      {yatirimMiktari - toplamYatirim}
                    </td>

                    <td
                      data-title="Kalan Lüks Tutarı"
                      style={
                        luksMiktari - toplamLuks < 0 ? { color: "red" } : {}
                      }
                    >
                      {luksMiktari - toplamLuks}
                    </td>
                    {maaslar.map(maas => (
                      <td
                        data-title="Kalan Lüks Tutarı"
                        style={
                          maas.maasMiktari - toplamBorc < 0
                            ? { color: "red" }
                            : {}
                        }
                      >
                        {maas.maasMiktari - toplamBorc}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editModalLabel">
                Harcama Düzenleme
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group mt-3">
                  <label htmlFor="harcama" className="form-label">
                    Harcama
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="harcama"
                    value={modalHarcama}
                    onChange={e => setModalHarcama(e.target.value)}
                    placeholder="Harcanan yeri giriniz"
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="typeTitleX" className="form-label">
                    Kullanım
                  </label>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle w-100 text-start"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {selectedOptionModal}
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelectModal("İhtiyaç")}
                        >
                          İhtiyaç
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelectModal("Yatırım")}
                        >
                          Yatırım
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelectModal("Lüks")}
                        >
                          Lüks
                        </div>
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={() => kullanimOptionSelectModal("Borç")}
                        >
                          Borç
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="miktar" className="form-label">
                    Miktar
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="miktar"
                    value={modalMiktar}
                    onChange={e => setModalMiktar(e.target.value)}
                    placeholder="Miktar"
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={editHarcamaSaveModal}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="deleteModalLabel">
                Bu işlemi silmek istediğinize emin misiniz?
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Hayır
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => harcamaSil(deleteId)}
              >
                Evet
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Maaş Düzenleme Modal */}
      <div
        className="modal fade"
        id="maasEditModal"
        tabIndex="-1"
        aria-labelledby="maasEditLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="maasEditLabel">
                Maaş Düzenleme
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="number"
                  className="form-control"
                  id="editMaas"
                  placeholder="Maas"
                  required
                  value={newMaas}
                  onChange={e => setNewMaas(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={editMaasSave}
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Harcama
