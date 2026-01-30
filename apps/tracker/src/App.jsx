import React, { useState, useEffect } from 'react'
import { 
  Heart, 
  Search, 
  Users, 
  Calendar, 
  Star, 
  Music, 
  Clock,
  Sparkles,
  ChevronRight,
  Cake,
  Loader2
} from 'lucide-react'

// ============ HELPERS ============
function calcAge(birthday, atDate = new Date()) {
  const birth = new Date(birthday)
  const at = new Date(atDate)
  let age = at.getFullYear() - birth.getFullYear()
  const monthDiff = at.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) age--
  return age
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// ============ API FUNCTIONS ============
async function fetchPeople() {
  const res = await fetch('/api/people')
  const data = await res.json()
  return data.map(p => {
    // Derive type from tags (e.g., "Family" -> "family", "Musician" -> "musician")
    const type = p.tags?.toLowerCase().includes('family') ? 'family'
               : p.tags?.toLowerCase().includes('youtuber') ? 'youtuber'
               : p.tags?.toLowerCase().includes('musician') ? 'musician'
               : 'other'
    return {
      ...p,
      type,
      isFavorite: p.is_favorite === 1,
      color: getColorForType(type)
    }
  })
}

async function fetchEvents() {
  const res = await fetch('/api/events')
  const data = await res.json()
  return data.map(e => ({
    ...e,
    name: e.title || e.name,  // Map title -> name for display
    isFavorite: e.is_favorite === 1,
    attended: e.attended === 1  // Convert to boolean
  }))
}

async function fetchGroups() {
  const res = await fetch('/api/groups')
  const data = await res.json()
  return data.map(g => ({
    ...g,
    isFavorite: g.is_favorite === 1
  }))
}

async function toggleFavoriteAPI(itemType, itemId) {
  const res = await fetch('/api/favorite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_type: itemType, item_id: itemId })
  })
  return res.json()
}

function getColorForType(type) {
  switch (type) {
    case 'family': return 'bg-coral'
    case 'youtuber': return 'bg-sky'
    case 'musician': return 'bg-lavender'
    default: return 'bg-sienna-400'
  }
}

// ============ COMPONENTS ============

function NavButton({ label, icon: Icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`nav-btn ${active ? 'active' : ''}`}>
      <Icon className="w-5 h-5" />
      <span className="text-xs">{label}</span>
    </button>
  )
}

function HeartButton({ isFavorite, onToggle }) {
  return (
    <button onClick={onToggle} className="heart-btn">
      <Heart 
        className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-coral text-coral' : 'text-warm-300'}`} 
      />
    </button>
  )
}

function PersonRow({ person, showHeart = true, onToggleFavorite, dateForAge = null }) {
  const age = calcAge(person.birthday, dateForAge)
  const isHighlight = person.type === 'family' && person.name?.toLowerCase().includes('sienna')
  
  return (
    <div className={`item-row ${isHighlight ? 'highlight' : ''}`}>
      <div className="avatar">
        <span>{person.emoji || '👤'}</span>
      </div>
      <div className="info">
        <div className="name">{person.nickname || person.name}</div>
        <div className="meta flex items-center gap-1">
          <Cake className="w-3 h-3" />
          {formatDate(person.birthday)}
        </div>
      </div>
      <span className={`age-badge ${person.color || 'bg-sienna-400'}`}>{age}</span>
      {showHeart && (
        <HeartButton 
          isFavorite={person.isFavorite} 
          onToggle={() => onToggleFavorite(person.id)} 
        />
      )}
    </div>
  )
}

function Pill({ item, selected, onClick }) {
  return (
    <button onClick={onClick} className={`pill ${selected ? 'selected' : ''}`}>
      <span className="emoji">{item.emoji || '📌'}</span>
      <span>{item.nickname || item.name}</span>
      {item.isFavorite && !selected && (
        <Heart className="w-3 h-3 fill-coral text-coral" />
      )}
    </button>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="w-8 h-8 text-sienna-500 animate-spin" />
    </div>
  )
}

// ============ PAGES ============

function TimelinePage({ people, events, onToggleFavorite, loading }) {
  const [selected, setSelected] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  
  // Auto-select family when loaded
  useEffect(() => {
    if (people.length > 0 && selected.length === 0) {
      const familyIds = people.filter(p => p.type === 'family').map(p => p.id)
      setSelected(familyIds)
    }
  }, [people])
  
  const favPeople = people.filter(p => p.isFavorite)
  const favEvents = events.filter(e => e.isFavorite)
  const selectedPeople = people.filter(p => selected.includes(p.id))

  const togglePerson = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const selectEvent = (event) => {
    setSelectedDate(event.date)
    // Auto-select family
    const familyIds = people.filter(p => p.type === 'family').map(p => p.id)
    setSelected(prev => [...new Set([...prev, ...familyIds])])
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        Timeline
      </h1>
      
      {/* Quick Add People */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Star className="w-3 h-3" /> Favorites
        </div>
        <div className="flex flex-wrap gap-2">
          {favPeople.map(p => (
            <Pill 
              key={p.id} 
              item={p} 
              selected={selected.includes(p.id)}
              onClick={() => togglePerson(p.id)} 
            />
          ))}
        </div>
      </div>

      {/* Quick Events */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Pick a Date
        </div>
        <div className="flex flex-wrap gap-2">
          <Pill 
            item={{ emoji: '📆', name: 'Today' }} 
            selected={selectedDate === new Date().toISOString().split('T')[0]}
            onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])} 
          />
          {favEvents.map(e => (
            <Pill 
              key={e.id} 
              item={e} 
              selected={selectedDate === e.date}
              onClick={() => selectEvent(e)} 
            />
          ))}
        </div>
      </div>

      {/* Results */}
      {selectedPeople.length > 0 ? (
        <div className="card bg-gradient-to-br from-sienna-50 to-white">
          <div className="card-header">
            <Cake className="w-5 h-5 text-sienna-500" />
            Ages on {formatDate(selectedDate)}
          </div>
          <div className="space-y-1">
            {selectedPeople
              .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
              .map(p => (
                <PersonRow 
                  key={p.id} 
                  person={p} 
                  showHeart={false}
                  dateForAge={selectedDate}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="icon">👆</div>
            <div className="message">Tap people above to compare!</div>
          </div>
        </div>
      )}
    </div>
  )
}

function PeoplePage({ people, onToggleFavorite, loading }) {
  const [search, setSearch] = useState('')
  const favorites = people.filter(p => p.isFavorite)
  const filtered = search 
    ? people.filter(p => (p.name || '').toLowerCase().includes(search.toLowerCase()))
    : people

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Users className="w-6 h-6" />
        People
      </h1>
      
      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="mb-4">
          <div className="section-header flex items-center gap-1">
            <Star className="w-3 h-3" /> Favorites
          </div>
          <div className="flex flex-wrap gap-2">
            {favorites.map(p => (
              <Pill key={p.id} item={p} />
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="search-box">
        <Search className="w-5 h-5 text-warm-400" />
        <input 
          type="text" 
          placeholder="Search people..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      <div className="card">
        {filtered.length > 0 ? (
          <div className="space-y-1">
            {filtered.map(p => (
              <PersonRow 
                key={p.id} 
                person={p} 
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">🔍</div>
            <div className="message">No people found</div>
          </div>
        )}
      </div>
    </div>
  )
}

function EventsPage({ events, onToggleFavorite, loading }) {
  const attended = events.filter(e => e.attended)

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Events
      </h1>
      
      {/* Shows We Attended */}
      {attended.length > 0 && (
        <div className="card bg-gradient-to-br from-sage-50 to-white mb-4">
          <div className="card-header text-sage-600">
            <Sparkles className="w-5 h-5" />
            Shows We Saw!
          </div>
          <div className="space-y-1">
            {attended.map(e => (
              <div key={e.id} className="item-row">
                <div className="avatar bg-sage-100">
                  <span>{e.emoji || '📅'}</span>
                </div>
                <div className="info">
                  <div className="name">{e.name}</div>
                  <div className="meta">{formatDate(e.date)}</div>
                </div>
                <HeartButton 
                  isFavorite={e.isFavorite} 
                  onToggle={() => onToggleFavorite(e.id)} 
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Events */}
      <div className="card">
        <div className="card-header">
          <Calendar className="w-5 h-5 text-sienna-500" />
          All Events
        </div>
        {events.length > 0 ? (
          <div className="space-y-1">
            {events.map(e => (
              <div key={e.id} className="item-row">
                <div className="avatar">
                  <span>{e.emoji || '📅'}</span>
                </div>
                <div className="info">
                  <div className="name">{e.name}</div>
                  <div className="meta">{formatDate(e.date)}</div>
                </div>
                {e.attended && (
                  <span className="text-xs text-sage-500 font-medium">✓ went</span>
                )}
                <HeartButton 
                  isFavorite={e.isFavorite} 
                  onToggle={() => onToggleFavorite(e.id)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">📅</div>
            <div className="message">No events yet</div>
          </div>
        )}
      </div>
    </div>
  )
}

function GroupsPage({ groups, onToggleFavorite, loading }) {
  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Music className="w-6 h-6" />
        Groups & Shows
      </h1>
      
      <div className="card">
        {groups.length > 0 ? (
          <div className="space-y-1">
            {groups.map(g => (
              <div key={g.id} className="item-row">
                <div className="avatar">
                  <span>{g.emoji || '🎵'}</span>
                </div>
                <div className="info">
                  <div className="name">{g.name}</div>
                  <div className="meta capitalize">{g.type}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-warm-300" />
                <HeartButton 
                  isFavorite={g.isFavorite} 
                  onToggle={() => onToggleFavorite(g.id)} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">🎵</div>
            <div className="message">No groups yet</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ============ MAIN APP ============
export default function App() {
  const [page, setPage] = useState('timeline')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({ people: [], events: [], groups: [] })

  // Load data from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const [people, events, groups] = await Promise.all([
          fetchPeople(),
          fetchEvents(),
          fetchGroups()
        ])
        setData({ people, events, groups })
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const toggleFavorite = async (type, id) => {
    // Optimistic update
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item => 
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    }))
    
    // Sync with API
    const itemType = type === 'people' ? 'person' : type.slice(0, -1) // people→person, events→event, groups→group
    try {
      await toggleFavoriteAPI(itemType, id)
    } catch (err) {
      console.error('Failed to toggle favorite:', err)
      // Revert on error
      setData(prev => ({
        ...prev,
        [type]: prev[type].map(item => 
          item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        )
      }))
    }
  }

  const renderPage = () => {
    switch (page) {
      case 'people':
        return <PeoplePage 
          people={data.people} 
          onToggleFavorite={(id) => toggleFavorite('people', id)}
          loading={loading}
        />
      case 'events':
        return <EventsPage 
          events={data.events} 
          onToggleFavorite={(id) => toggleFavorite('events', id)}
          loading={loading}
        />
      case 'groups':
        return <GroupsPage 
          groups={data.groups} 
          onToggleFavorite={(id) => toggleFavorite('groups', id)}
          loading={loading}
        />
      case 'timeline':
      default:
        return <TimelinePage 
          people={data.people} 
          events={data.events}
          onToggleFavorite={(id) => toggleFavorite('events', id)}
          loading={loading}
        />
    }
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-sienna-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-sienna-500 to-sienna-600 text-white p-4 safe-top">
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          sienna
        </h1>
        <p className="text-sienna-100 text-sm">How old was everyone?</p>
      </header>

      {/* Content */}
      <main className="pb-20">
        {renderPage()}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-sienna-100 p-2 safe-bottom">
        <div className="flex justify-around max-w-md mx-auto">
          <NavButton 
            label="Timeline" 
            icon={Clock} 
            active={page === 'timeline'} 
            onClick={() => setPage('timeline')} 
          />
          <NavButton 
            label="People" 
            icon={Users} 
            active={page === 'people'} 
            onClick={() => setPage('people')} 
          />
          <NavButton 
            label="Events" 
            icon={Calendar} 
            active={page === 'events'} 
            onClick={() => setPage('events')} 
          />
          <NavButton 
            label="Groups" 
            icon={Music} 
            active={page === 'groups'} 
            onClick={() => setPage('groups')} 
          />
        </div>
      </nav>
    </div>
  )
}
