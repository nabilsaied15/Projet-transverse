import { useState, useEffect } from 'react'
import './index.css'
import { categories, businesses } from './data/BusinessData'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBusiness, setSelectedBusiness] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentView, setCurrentView] = useState('home') // 'home', 'login', 'signup', 'favorites'
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (token) {
      fetchFavorites()
    } else {
      setFavorites([])
    }
  }, [token])

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/favorites`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      if (res.ok) {
        const data = await res.json()
        setFavorites(data)
      }
    } catch (err) {
      console.error('Error fetching favorites:', err)
    }
  }

  const toggleFavorite = async (e, businessId) => {
    e.stopPropagation()
    if (!token) {
      setCurrentView('login')
      return
    }

    try {
      console.log(`Toggling favorite for business: ${businessId}`);
      const res = await fetch(`${API_BASE_URL}/favorites/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ business_id: businessId })
      })
      const data = await res.json()
      if (res.ok) {
        if (data.favorited) {
          console.log(`Added business ${businessId} to favorites`);
          setFavorites([...favorites, businessId])
        } else {
          console.log(`Removed business ${businessId} from favorites`);
          setFavorites(favorites.filter(id => id !== businessId))
        }
      } else {
        console.error('Toggle favorite failed:', data.message);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      console.log(`Attempting login for: ${email}`);
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        console.log('Login successful:', data.user.name);
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        setCurrentView('home')
      } else {
        console.error('Login failed:', data.message);
        alert(`Erreur de connexion : ${data.message}`)
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Vérifiez que le serveur est lancé.')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      console.log(`Attempting signup for: ${email}`);
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (res.ok) {
        console.log('Signup successful:', data.user.name);
        setUser(data.user)
        setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('token', data.token)
        setCurrentView('home')
      } else {
        console.error('Signup failed:', data.message);
        alert(`Erreur d'inscription : ${data.message}`)
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Signup failed. Vérifiez que le serveur est lancé.')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setCurrentView('home')
  }

  const filteredBusinesses = businesses.filter(b => {
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFavorites = currentView !== 'favorites' || favorites.includes(b.id)
    return matchesCategory && matchesSearch && matchesFavorites
  })

  const HomeView = () => (
    <div className="container">
      <header className="hero">
        <h1 className="text-gradient">
          {currentView === 'favorites' ? 'Mes Favoris' : 'Commerce Local'}
        </h1>
        <p>
          {currentView === 'favorites'
            ? 'Retrouvez ici tous les commerces que vous adorez.'
            : 'Découvrez le meilleur de votre quartier et soutenez vos commerçants de proximité.'}
        </p>

        {currentView !== 'favorites' && (
          <div style={{ maxWidth: '500px', margin: '0 auto 3rem', position: 'relative' }}>
            <input
              type="text"
              placeholder="Rechercher un commerce ou un produit..."
              className="filter-btn"
              style={{ width: '100%', padding: '1rem 1.5rem', borderRadius: '16px', background: 'var(--surface)' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        <div className="filters-container">
          <button
            className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>🌍</span> Tous
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </header>

      <main className="business-grid">
        {filteredBusinesses.length > 0 ? (
          filteredBusinesses.map(business => (
            <article
              key={business.id}
              className="card"
              onClick={() => {
                setSelectedBusiness(business)
                window.scrollTo(0, 0)
              }}
            >
              <div className="card-image-container">
                <img src={business.image} alt={business.name} className="card-image" />
                <button
                  className={`fav-btn ${favorites.includes(business.id) ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(e, business.id)}
                >
                  {favorites.includes(business.id) ? '❤️' : '🤍'}
                </button>
              </div>
              <div className="card-content">
                <div className="card-meta">
                  <span className="badge">{categories.find(c => c.id === business.category)?.name}</span>
                  <span className="rating">★ {business.rating}</span>
                </div>
                <h3 className="card-title">{business.name}</h3>
                <p className="card-desc">{business.description}</p>
              </div>
              <div className="card-footer">
                <span>📍 {business.address.split(',')[0]}</span>
                <span>{business.reviews} avis</span>
              </div>
            </article>
          ))
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
              {currentView === 'favorites' ? 'Vous n\'avez pas encore de favoris.' : 'Aucun commerce trouvé.'}
            </p>
          </div>
        )}
      </main>
    </div>
  )

  const LoginView = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Se connecter</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="votre@email.com" />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" name="password" required placeholder="••••••••" />
          </div>
          <button type="submit" className="filter-btn active w-full">Connexion</button>
        </form>
        <p className="auth-footer">
          Pas encore de compte ? <span onClick={() => setCurrentView('signup')}>S'inscrire</span>
        </p>
      </div>
    </div>
  )

  const SignupView = () => (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Créer un compte</h2>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Nom complet</label>
            <input type="text" name="name" required placeholder="Jean Dupont" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="votre@email.com" />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" name="password" required placeholder="••••••••" />
          </div>
          <button type="submit" className="filter-btn active w-full">S'inscrire</button>
        </form>
        <p className="auth-footer">
          Déjà un compte ? <span onClick={() => setCurrentView('login')}>Se connecter</span>
        </p>
      </div>
    </div>
  )

  const [showComments, setShowComments] = useState(false)

  const CommentsSheet = ({ business, onClose }) => (
    <>
      <div className={`sheet-overlay ${showComments ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`comments-sheet ${showComments ? 'active' : ''}`}>
        <div className="sheet-header">
          <div className="sheet-handle"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Avis pour {business.name}</h2>
            <button className="close-sheet" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="sheet-body">
          {business.reviews_list && business.reviews_list.length > 0 ? (
            business.reviews_list.map(rev => (
              <div key={rev.id} className="review-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700 }}>{rev.user}</span>
                  <span style={{ color: 'var(--primary)' }}>{'★'.repeat(rev.rating)}</span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5' }}>{rev.comment}</p>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>Aucun avis pour le moment.</p>
          )}
        </div>
      </div>
    </>
  )

  const DetailView = ({ business }) => (
    <div className="container detail-view">
      <button className="back-btn" onClick={() => setSelectedBusiness(null)}>
        ← Retour au catalogue
      </button>

      <section className="detail-header">
        <div className="detail-info">
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            {categories.find(c => c.id === business.category)?.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h1>{business.name}</h1>
            <button
              className={`fav-btn list-view ${favorites.includes(business.id) ? 'active' : ''}`}
              onClick={(e) => toggleFavorite(e, business.id)}
              style={{ fontSize: '2rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {favorites.includes(business.id) ? '❤️' : '🤍'}
            </button>
          </div>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
            {business.description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem', background: 'var(--glass)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Note Globale</p>
              <p className="rating" style={{ fontSize: '1.5rem' }}>★ {business.rating} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>({business.reviews} avis)</span></p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Localisation</p>
              <p style={{ fontWeight: 600 }}>{business.address}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Contact Téléphone</p>
              <p style={{ fontWeight: 600, color: 'var(--primary)' }}>{business.phone}</p>
            </div>
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Email / Contact</p>
              <p style={{ fontWeight: 600 }}>{business.email}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button className="filter-btn active" style={{ flex: 1, padding: '1rem' }}>Contacter le commerce</button>
            <button className="filter-btn" style={{ flex: 1, padding: '1rem' }}>Itinéraire</button>
          </div>

          <button
            className="filter-btn"
            style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }}
            onClick={() => setShowComments(true)}
          >
            💬 Voir les commentaires
          </button>

          <div style={{ background: 'var(--glass)', backdropFilter: 'blur(10px)', padding: '1rem 1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ fontSize: '1.5rem' }}>🕒</div>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: 0 }}>Ouvert</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Ferme à 19:30</p>
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <img
            src={business.image}
            alt={business.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}
          />
        </div>
      </section>

      <section className="product-section">
        <h2 style={{ marginBottom: '2.5rem', fontSize: '2.5rem', fontWeight: 800 }}>
          Catalogue <span className="text-gradient">Produits</span>
        </h2>
        <div className="product-grid">
          {business.products.map(product => (
            <div key={product.id} className="product-card">
              <div style={{ overflow: 'hidden', borderRadius: '12px', marginBottom: '1rem' }}>
                <img src={product.image} alt={product.name} className="product-img" style={{ transition: 'transform 0.5s ease' }} />
              </div>
              <div className="product-name" style={{ fontSize: '1.1rem' }}>{product.name}</div>
              <div className="product-price" style={{ fontSize: '1.25rem' }}>{product.price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</div>
            </div>
          ))}
        </div>
      </section>

      <CommentsSheet business={business} onClose={() => setShowComments(false)} />
    </div>
  )

  const [adminStats, setAdminStats] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    if (currentView === 'admin') {
      fetchAdminStats()
      fetchAllUsers()
    }
  }, [currentView])

  const fetchAdminStats = async () => {
    console.log('Fetching admin stats...')
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`)
      console.log('Admin stats response status:', res.status)
      if (res.ok) {
        const data = await res.json()
        console.log('Admin stats data:', data)
        setAdminStats(data)
      }
    } catch (err) {
      console.error('Error fetching admin stats:', err)
    }
  }

  const fetchAllUsers = async () => {
    console.log('Fetching all users...')
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users`)
      console.log('All users response status:', res.status)
      if (res.ok) {
        const data = await res.json()
        console.log('All users data:', data)
        setAllUsers(data)
      }
    } catch (err) {
      console.error('Error fetching users:', err)
    }
  }

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })
      if (res.ok) {
        fetchAllUsers()
      }
    } catch (err) {
      console.error('Error updating user:', err)
    }
  }

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
    try {
      const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE'
      })
      if (res.ok) {
        fetchAllUsers()
      }
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  const AdminView = () => {
    console.log('AdminView rendering...');
    console.log('AdminStats:', adminStats);
    console.log('AllUsers:', allUsers);

    const lineData = (adminStats && adminStats.registrationTrend) ? {
      labels: adminStats.registrationTrend.labels,
      datasets: [{
        label: 'Inscriptions',
        data: adminStats.registrationTrend.data,
        borderColor: '#646cff',
        backgroundColor: 'rgba(100, 108, 255, 0.2)',
        tension: 0.4,
        fill: true,
      }]
    } : null

    const donutData = (adminStats && adminStats.categoryDistribution) ? {
      labels: adminStats.categoryDistribution.labels,
      datasets: [{
        data: adminStats.categoryDistribution.data,
        backgroundColor: [
          '#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40'
        ],
        borderWidth: 0,
      }]
    } : null

    console.log('LineData available:', !!lineData);
    console.log('DonutData available:', !!donutData);

    return (
      <div className="container admin-view">
        <header className="hero">
          <h1 className="text-gradient">Tableau de Bord Admin</h1>
          <p>Analyse des performances et gestion des utilisateurs.</p>
        </header>

        {adminStats ? (
          <>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">🏪</span>
                  <span className="stat-label">Commerces</span>
                </div>
                <div className="stat-value">{adminStats.totalBusinesses}</div>
                <div className="stat-desc">Commerces référencés</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">👥</span>
                  <span className="stat-label">Inscriptions</span>
                </div>
                <div className="stat-value">{adminStats.totalUsers}</div>
                <div className="stat-desc">Utilisateurs enregistrés</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">📊</span>
                  <span className="stat-label">Visites</span>
                </div>
                <div className="stat-value">{adminStats.monthlyVisits}</div>
                <div className="stat-desc">Visites mensuelles estimées</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">❤️</span>
                  <span className="stat-label">Engagement</span>
                </div>
                <div className="stat-value">{adminStats.totalFavorites}</div>
                <div className="stat-desc">Nombre total de favoris</div>
              </div>
            </div>

            <div className="charts-container">
              <div className="chart-card stat-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Tendance des Inscriptions</h3>
                {lineData && <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } } }} />}
              </div>
              <div className="chart-card stat-card">
                <h3 style={{ marginBottom: '1.5rem' }}>Répartition Commerces</h3>
                <div style={{ maxWidth: '300px', margin: '0 auto' }}>
                  {donutData && <Doughnut data={donutData} options={{ responsive: true }} />}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Chargement des statistiques...</div>
        )}

        <div className="user-management stat-card">
          <h2 style={{ marginBottom: '2rem' }}>Gestion des Utilisateurs</h2>
          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers && allUsers.length > 0 ? allUsers.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <span className={`role-badge ${u.role}`}>{u.role}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="action-btn"
                          onClick={() => handleUpdateRole(u.id, u.role === 'admin' ? 'user' : 'admin')}
                        >
                          {u.role === 'admin' ? 'Passer User' : 'Passer Admin'}
                        </button>
                        <button className="action-btn delete" onClick={() => handleDeleteUser(u.id)}>Supprimer</button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Aucun utilisateur trouvé.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }


  const renderContent = () => {
    if (selectedBusiness) return <DetailView business={selectedBusiness} />
    if (currentView === 'login') return <LoginView />
    if (currentView === 'signup') return <SignupView />
    if (currentView === 'admin') {
      if (user && user.role === 'admin') return <AdminView />
      return <HomeView />
    }
    return <HomeView />
  }


  return (
    <div className="App">
      <nav>
        <div className="container nav-content">
          <div className="logo" onClick={() => { setSelectedBusiness(null); setCurrentView('home'); }}>
            LOCAL<span className="text-gradient">COMMERCE</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', fontWeight: 500, alignItems: 'center' }}>
            <span
              style={{ cursor: 'pointer', color: currentView === 'home' && !selectedBusiness ? 'var(--primary)' : 'var(--text-muted)' }}
              onClick={() => { setSelectedBusiness(null); setCurrentView('home'); }}
            >
              Accueil
            </span>
            <span
              style={{ cursor: 'pointer', color: currentView === 'favorites' ? 'var(--primary)' : 'var(--text-muted)' }}
              onClick={() => { setSelectedBusiness(null); setCurrentView('favorites'); }}
            >
              Favoris
            </span>
            {user && (user.role === 'admin' || user.email === 'nabilsaied04@gmail.com') && (
              <span
                style={{ cursor: 'pointer', color: currentView === 'admin' ? 'var(--primary)' : 'var(--text-muted)' }}
                onClick={() => { setSelectedBusiness(null); setCurrentView('admin'); }}
              >
                Admin
              </span>
            )}
            {user ? (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text)', fontWeight: 600 }}>{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="filter-btn"
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <span
                style={{ cursor: 'pointer', color: currentView === 'login' ? 'var(--primary)' : 'var(--text-muted)' }}
                onClick={() => { setSelectedBusiness(null); setCurrentView('login'); }}
              >
                Connexion
              </span>
            )}
          </div>
        </div>
      </nav>

      {renderContent()}

      <footer style={{ padding: '4rem 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-muted)' }}>© 2026 LocalCommerce - Projet Transverse RNCP39608</p>
      </footer>
    </div>
  )
}

export default App

