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
  Loader2,
  ArrowLeft,
  Disc3,
  Instagram,
  MapPin
} from 'lucide-react'

// ============ HELPERS ============
function calcAge(birthday, atDate) {
  if (!birthday) return null
  const birth = new Date(birthday)
  // Handle null/undefined atDate - use today
  const at = atDate ? new Date(atDate) : new Date()
  let age = at.getFullYear() - birth.getFullYear()
  const monthDiff = at.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) age--
  return age
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatBirthday(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// ============ API FUNCTIONS ============
async function fetchPeople() {
  const res = await fetch('/api/people')
  const data = await res.json()
  return data.map(p => {
    // Determine type from tags or group_type
    const type = p.tags?.toLowerCase().includes('family') ? 'family'
               : p.group_type === 'youtube' ? 'youtuber'
               : p.group_type === 'band' ? 'musician'
               : p.tags?.toLowerCase().includes('youtuber') ? 'youtuber'
               : p.tags?.toLowerCase().includes('musician') ? 'musician'
               : 'other'
    return {
      ...p,
      type,
      isFavorite: p.is_favorite === 1,
      color: p.color || getColorForType(type)
    }
  })
}

async function fetchEvents() {
  const res = await fetch('/api/events')
  const data = await res.json()
  return data.map(e => ({
    ...e,
    name: e.title || e.name,
    isFavorite: e.is_favorite === 1,
    attended: e.attended === 1,
    group_id: e.group_id,
    description: e.description
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

async function fetchWorks() {
  const res = await fetch('/api/works')
  const data = await res.json()
  return data.map(w => ({
    ...w,
    name: w.title,
    isFavorite: w.is_favorite === 1
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
    case 'family': return '#FF69B4'
    case 'youtuber': return '#E74C3C'
    case 'musician': return '#9B59B6'
    default: return '#C9A88C'
  }
}

// ============ COMPONENTS ============

function NavButton({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[60px]
        rounded-2xl font-medium transition-all duration-200
        ${active
          ? 'bg-sienna-500 text-white shadow-lg scale-105'
          : 'text-warm-500 hover:text-sienna-600 hover:bg-sienna-50'
        }
      `}
    >
      <Icon className={`w-5 h-5 ${active ? '' : 'opacity-70'}`} />
      <span className="text-[11px]">{label}</span>
    </button>
  )
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-4 px-4 py-2 bg-sienna-500 text-white rounded-full font-medium text-sm flex items-center gap-1"
    >
      <ArrowLeft className="w-4 h-4" /> Back
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

function PersonRow({ person, showHeart = true, onToggleFavorite, dateForAge = null, onClick, showStatus = false, showGroup = true }) {
  const age = calcAge(person.birthday, dateForAge)
  const isHighlight = person.type === 'family' && person.name?.toLowerCase().includes('sienna')

  return (
    <div
      className={`item-row ${isHighlight ? 'highlight' : ''} ${onClick ? 'cursor-pointer hover:bg-warm-50' : ''}`}
      onClick={onClick}
    >
      <div className="avatar bg-warm-100">
        <span>{person.emoji || '👤'}</span>
      </div>
      <div className="info">
        <div className="name">{person.nickname || person.name}</div>
        {/* Show group/channel association - subtle gray */}
        {showGroup && person.group_name && person.type !== 'family' && (
          <div className="text-xs text-warm-400 flex items-center gap-1">
            <span>{person.group_emoji || '📺'}</span>
            <span>{person.group_name}</span>
          </div>
        )}
        <div className="meta flex items-center gap-1">
          <Cake className="w-3 h-3" />
          {formatDate(person.birthday)}
        </div>
        {showStatus && person.left_date && (
          <div className="text-xs text-warm-400">(left group)</div>
        )}
      </div>
      {/* Consistent neutral age badge */}
      <span className="age-badge bg-sienna-400 text-white">{age}</span>
      {onClick && <ChevronRight className="w-4 h-4 text-warm-300" />}
      {showHeart && onToggleFavorite && (
        <HeartButton
          isFavorite={person.isFavorite}
          onToggle={(e) => { e?.stopPropagation(); onToggleFavorite(person.id) }}
        />
      )}
    </div>
  )
}

function Pill({ item, selected, onClick, onToggleFavorite }) {
  return (
    <div className="relative inline-flex">
      <button onClick={onClick} className={`pill ${selected ? 'selected' : ''}`}>
        <span className="emoji">{item.emoji || '📌'}</span>
        <span>{item.nickname || item.name}</span>
        {item.isFavorite && !selected && (
          <Heart className="w-3 h-3 fill-coral text-coral" />
        )}
      </button>
      {/* Tap heart to unfavorite */}
      {onToggleFavorite && item.isFavorite && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow flex items-center justify-center border border-warm-100 active:scale-90"
        >
          <Heart className="w-3 h-3 fill-coral text-coral" />
        </button>
      )}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="w-8 h-8 text-sienna-500 animate-spin" />
    </div>
  )
}

// ============ DETAIL VIEWS ============

function PersonDetailView({ person, family, onBack }) {
  const ageNow = calcAge(person.birthday)
  const ageAtJoin = person.joined_date ? calcAge(person.birthday, person.joined_date) : null
  const ageAtLeft = person.left_date ? calcAge(person.birthday, person.left_date) : null

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <BackButton onClick={onBack} />

      {/* Person Header */}
      <div
        className="card mb-4"
        style={{ background: `linear-gradient(135deg, ${person.color}30, white)` }}
      >
        <div className="text-center py-4">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-4xl"
            style={{ backgroundColor: person.color || '#FF69B4' }}
          >
            {person.emoji || '👤'}
          </div>
          <h2 className="text-2xl font-display font-bold text-sienna-700">
            {person.nickname || person.name}
          </h2>
          {person.nickname && person.name !== person.nickname && (
            <p className="text-warm-500 text-sm">{person.name}</p>
          )}
          {person.role && (
            <p className="text-sienna-500 text-sm mt-1">{person.role}</p>
          )}
        </div>
      </div>

      {/* Birthday Card */}
      <div className="card mb-4">
        <div className="card-header">
          <Cake className="w-5 h-5 text-sienna-500" />
          Birthday
        </div>
        <div className="p-3">
          <p className="text-lg font-semibold">{formatBirthday(person.birthday)}</p>
          <p className="text-warm-500">Age now: <strong className="text-sienna-600">{ageNow}</strong></p>
        </div>
      </div>

      {/* Ages at Key Moments - for band members */}
      {ageAtJoin !== null && (
        <div className="card mb-4">
          <div className="card-header">
            <Clock className="w-5 h-5 text-sienna-500" />
            Ages at Key Moments
          </div>
          <div className="space-y-2 p-3">
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Joined Band</div>
                <div className="text-xs text-warm-400">{formatDate(person.joined_date)}</div>
              </div>
              <span className="px-3 py-1 bg-green-500 text-white rounded-full font-bold">{ageAtJoin}</span>
            </div>
            {ageAtLeft !== null && (
              <div className="flex justify-between items-center p-2 bg-pink-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Left Band</div>
                  <div className="text-xs text-warm-400">{formatDate(person.left_date)}</div>
                </div>
                <span className="px-3 py-1 bg-pink-500 text-white rounded-full font-bold">{ageAtLeft}</span>
              </div>
            )}
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg">
              <div>
                <div className="font-bold text-sm">Right NOW</div>
                <div className="text-xs text-warm-400">Today!</div>
              </div>
              <span className="px-3 py-1 bg-orange-500 text-white rounded-full font-bold">{ageNow}</span>
            </div>
          </div>
        </div>
      )}

      {/* Our Family When They Joined - for band members */}
      {person.joined_date && family.length > 0 && (
        <div className="card mb-4 bg-gradient-to-br from-blue-50 to-white">
          <div className="card-header text-blue-600">
            <Users className="w-5 h-5" />
            Our Family When {person.nickname || person.name} Joined
          </div>
          <div className="space-y-1">
            {family.map(f => (
              <PersonRow
                key={f.id}
                person={f}
                showHeart={false}
                dateForAge={person.joined_date}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fun Fact */}
      {person.fun_fact && (
        <div className="card mb-4">
          <div className="card-header">
            <Sparkles className="w-5 h-5 text-sienna-500" />
            Fun Fact
          </div>
          <p className="p-3 text-warm-600">{person.fun_fact}</p>
        </div>
      )}

      {/* Current Status */}
      {person.current_status && (
        <div className="card mb-4">
          <div className="card-header">
            <Star className="w-5 h-5 text-sienna-500" />
            Now
          </div>
          <p className="p-3 text-warm-600">{person.current_status}</p>
        </div>
      )}

      {/* Instagram */}
      {person.instagram && (
        <div
          className="card text-center p-4"
          style={{ backgroundColor: person.color || '#FF69B4' }}
        >
          <p className="text-white font-semibold flex items-center justify-center gap-2">
            <Instagram className="w-5 h-5" />
            {person.instagram}
          </p>
        </div>
      )}
    </div>
  )
}

function SongDetailView({ song, people, family, works, onBack }) {
  // Get band members who were active when song was released AND in the same group
  const bandMembers = people.filter(p =>
    p.group_id === song.group_id &&
    p.joined_date &&
    new Date(p.joined_date) <= new Date(song.release_date) &&
    (!p.left_date || new Date(p.left_date) > new Date(song.release_date))
  )

  // Get album tracks if this is an album
  const albumTracks = works
    .filter(w => w.parent_id === song.id)
    .sort((a, b) => (a.track_number || 0) - (b.track_number || 0))

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <BackButton onClick={onBack} />

      {/* Song Header */}
      <div className="card mb-4 bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <div className="text-center py-6">
          <div className="text-5xl mb-2">{song.emoji || '🎵'}</div>
          <h2 className="text-2xl font-display font-bold">{song.name}</h2>
          <p className="opacity-90">{song.type} • {formatDate(song.release_date)}</p>
          {song.note && <p className="mt-2 text-sm">{song.note}</p>}
        </div>
      </div>

      {/* Album Tracks with Lyrics Links */}
      {albumTracks.length > 0 && (
        <div className="card mb-4 bg-gradient-to-br from-purple-50 to-white">
          <div className="card-header text-purple-600">
            <Disc3 className="w-5 h-5" />
            {albumTracks.length} Songs on this Album
          </div>
          <div className="space-y-1">
            {albumTracks.map(track => (
              <a
                key={track.id}
                href={track.lyrics_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="item-row hover:bg-purple-50 cursor-pointer block"
              >
                <div className="avatar bg-purple-100">
                  <span>{track.emoji || '🎵'}</span>
                </div>
                <div className="info">
                  <div className="name">{track.track_number}. {track.name}</div>
                  {track.lyrics_url && (
                    <div className="meta text-purple-500">Tap for lyrics →</div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Single Song Lyrics Link */}
      {song.lyrics_url && song.type !== 'album' && (
        <a
          href={song.lyrics_url}
          target="_blank"
          rel="noopener noreferrer"
          className="card mb-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white block hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-4 p-4">
            <div className="text-4xl">📝</div>
            <div className="flex-1">
              <div className="font-bold text-lg">View Lyrics</div>
              <div className="opacity-90 text-sm">Tap to sing along!</div>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
        </a>
      )}

      {/* Band Members at Release */}
      {bandMembers.length > 0 && (
        <div className="card mb-4 bg-gradient-to-br from-yellow-50 to-white">
          <div className="card-header text-yellow-600">
            <Music className="w-5 h-5" />
            Band Members
          </div>
          <div className="space-y-1">
            {bandMembers.map(m => (
              <PersonRow
                key={m.id}
                person={m}
                showHeart={false}
                dateForAge={song.release_date}
                showStatus={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Our Family */}
      {family.length > 0 && (
        <div className="card bg-gradient-to-br from-blue-50 to-white">
          <div className="card-header text-blue-600">
            <Users className="w-5 h-5" />
            Our Family
          </div>
          <div className="space-y-1">
            {family.map(f => (
              <PersonRow
                key={f.id}
                person={f}
                showHeart={false}
                dateForAge={song.release_date}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ============ PAGES ============

// Simple horizontal pill button - clean and readable
function CategoryButton({ label, count, isActive, onClick }) {
  // Truncate long labels for better display (keep it short for pills)
  const shortLabel = label.length > 12 ? label.substring(0, 11) + '…' : label
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-1.5 px-3 py-2 whitespace-nowrap
        rounded-full font-medium border-2 transition-all duration-200
        active:scale-95 text-sm flex-shrink-0
        ${isActive
          ? 'bg-sienna-500 text-white border-sienna-500 shadow-md'
          : 'bg-white text-warm-600 border-warm-200 hover:border-warm-300 hover:bg-warm-50'
        }
      `}
      title={label}
    >
      {shortLabel}
      {count > 0 && (
        <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/30' : 'bg-warm-100'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

// Scrollable person picker for accessibility - neutral colors
function PersonPicker({ people, selected, onToggle, onToggleFavorite, title }) {
  if (people.length === 0) return null

  return (
    <div className="mb-3">
      <div className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-2 px-1">
        {title}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {people.map(p => {
          const isSelected = selected.includes(p.id)
          return (
            <div key={p.id} className="flex-shrink-0 relative">
              <button
                onClick={() => onToggle(p.id)}
                className={`
                  flex flex-col items-center gap-1 p-3 min-w-[70px]
                  rounded-xl border-2 transition-all duration-200 active:scale-95
                  ${isSelected
                    ? 'bg-sienna-500 text-white border-sienna-500 shadow-md'
                    : 'bg-white text-warm-600 border-warm-200 hover:border-warm-300'
                  }
                `}
              >
                <span className="text-2xl">{p.emoji || '👤'}</span>
                <span className="text-xs font-medium truncate max-w-[60px]">
                  {p.nickname || p.name?.split(' ')[0]}
                </span>
                {isSelected && <span className="text-[10px]">✓</span>}
              </button>
              {/* Favorite heart in corner */}
              {onToggleFavorite && (
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(p.id); }}
                  className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center border border-warm-100 active:scale-90 transition-transform"
                >
                  <Heart className={`w-3.5 h-3.5 ${p.isFavorite ? 'fill-coral text-coral' : 'text-warm-300'}`} />
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Event picker with big touchable buttons - neutral colors
function EventPicker({ events, selectedDate, onSelectEvent, title }) {
  if (events.length === 0) return null

  return (
    <div className="mb-3">
      <div className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-2 px-1">
        {title}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {events.map(e => {
          const isSelected = selectedDate === e.date
          return (
            <button
              key={e.id}
              onClick={() => onSelectEvent(e)}
              className={`
                flex-shrink-0 flex flex-col items-center gap-1 p-3 min-w-[90px]
                rounded-xl border-2 transition-all duration-200 active:scale-95
                ${isSelected
                  ? 'bg-sienna-500 text-white border-sienna-500 shadow-md'
                  : 'bg-white text-warm-600 border-warm-200 hover:border-warm-300'
                }
              `}
            >
              <span className="text-2xl">{e.emoji || '📅'}</span>
              <span className="text-xs font-medium text-center line-clamp-2 max-w-[80px]">
                {e.name}
              </span>
              <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-warm-400'}`}>
                {formatDate(e.date).split(',')[0]}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TimelinePage({ people, events, groups = [], onToggleFavorite, loading }) {
  const [selected, setSelected] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showPeoplePicker, setShowPeoplePicker] = useState(null) // 'family' | group_id | 'all' | null
  const [showEventPicker, setShowEventPicker] = useState(false)

  // Auto-select family on first load
  useEffect(() => {
    if (people.length > 0 && selected.length === 0) {
      const familyIds = people.filter(p => p.type === 'family').map(p => p.id)
      setSelected(familyIds)
    }
  }, [people])

  // Group people by their actual group
  const familyMembers = people.filter(p => p.type === 'family')
  const favPeople = people.filter(p => p.isFavorite)
  const favEvents = events.filter(e => e.isFavorite)
  const attendedEvents = events.filter(e => e.attended)
  const selectedPeople = people.filter(p => selected.includes(p.id))

  // Get people for a specific group
  const getPeopleInGroup = (groupId) => people.filter(p => p.group_id === groupId)

  const togglePerson = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(i => i !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const selectAllInCategory = (categoryPeople) => {
    const ids = categoryPeople.map(p => p.id)
    setSelected(prev => [...new Set([...prev, ...ids])])
  }

  const clearCategory = (categoryPeople) => {
    const ids = categoryPeople.map(p => p.id)
    setSelected(prev => prev.filter(id => !ids.includes(id)))
  }

  const selectEvent = (event) => {
    setSelectedDate(event.date)
    setSelectedEvent(event)
    // Auto-add family when selecting an event
    const familyIds = familyMembers.map(p => p.id)
    setSelected(prev => [...new Set([...prev, ...familyIds])])
    setShowEventPicker(false)
  }

  const selectToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0])
    setSelectedEvent(null)
    setShowEventPicker(false)
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        Timeline
      </h1>

      {/* Quick Favorites - only show if there are favorites */}
      {favPeople.length > 0 && (
        <div className="mb-4">
          <div className="section-header flex items-center gap-1">
            <Heart className="w-3 h-3 fill-coral text-coral" /> Quick Add Favorites
          </div>
          <div className="flex flex-wrap gap-2">
            {favPeople.map(p => (
              <Pill
                key={p.id}
                item={p}
                selected={selected.includes(p.id)}
                onClick={() => togglePerson(p.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Browse People - Family first, then groups */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Users className="w-3 h-3" /> Browse People
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryButton
            label="Family"
            count={familyMembers.length}
            isActive={showPeoplePicker === 'family'}
            onClick={() => setShowPeoplePicker(showPeoplePicker === 'family' ? null : 'family')}
          />
          {groups.map(g => {
            const groupPeople = getPeopleInGroup(g.id)
            if (groupPeople.length === 0) return null
            return (
              <CategoryButton
                key={g.id}
                label={g.name}
                count={groupPeople.length}
                isActive={showPeoplePicker === g.id}
                onClick={() => setShowPeoplePicker(showPeoplePicker === g.id ? null : g.id)}
              />
            )
          })}
          <CategoryButton
            label="Everyone"
            count={people.length}
            isActive={showPeoplePicker === 'all'}
            onClick={() => setShowPeoplePicker(showPeoplePicker === 'all' ? null : 'all')}
          />
        </div>
      </div>

      {/* Expandable Person Picker */}
      {showPeoplePicker && (
        <div className="card mb-4 bg-warm-50">
          {(() => {
            // Determine which people to show based on selection
            const selectedGroup = groups.find(g => g.id === showPeoplePicker)
            const pickerPeople = showPeoplePicker === 'family' ? familyMembers
              : showPeoplePicker === 'all' ? people
              : selectedGroup ? getPeopleInGroup(selectedGroup.id)
              : []
            const pickerTitle = showPeoplePicker === 'family' ? '👨‍👩‍👧‍👦 Family'
              : showPeoplePicker === 'all' ? '👥 Everyone'
              : selectedGroup ? `${selectedGroup.emoji || '👥'} ${selectedGroup.name}`
              : ''

            return (
              <>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-warm-700">{pickerTitle}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => selectAllInCategory(pickerPeople)}
                      className="text-xs px-3 py-1.5 bg-sienna-500 text-white rounded-full font-medium"
                    >
                      Add All
                    </button>
                    <button
                      onClick={() => clearCategory(pickerPeople)}
                      className="text-xs px-3 py-1.5 bg-warm-200 text-warm-600 rounded-full font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <PersonPicker people={pickerPeople} selected={selected} onToggle={togglePerson} onToggleFavorite={onToggleFavorite} title="Tap to add" />
              </>
            )
          })()}
        </div>
      )}

      {/* Date Selection */}
      <div className="mb-4">
        <div className="section-header flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Pick a Date
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <CategoryButton
            label="Today"
            isActive={!selectedEvent && selectedDate === new Date().toISOString().split('T')[0]}
            onClick={selectToday}
          />
          {attendedEvents.length > 0 && (
            <CategoryButton
              label="Concerts"
              count={attendedEvents.length}
              isActive={showEventPicker === 'attended'}
              onClick={() => setShowEventPicker(showEventPicker === 'attended' ? false : 'attended')}
            />
          )}
          {favEvents.length > 0 && (
            <CategoryButton
              label="Favorites"
              count={favEvents.length}
              isActive={showEventPicker === 'favorites'}
              onClick={() => setShowEventPicker(showEventPicker === 'favorites' ? false : 'favorites')}
            />
          )}
          <CategoryButton
            label="All Events"
            count={events.length}
            isActive={showEventPicker === 'all'}
            onClick={() => setShowEventPicker(showEventPicker === 'all' ? false : 'all')}
          />
        </div>
      </div>

      {/* Expandable Event Picker */}
      {showEventPicker && (
        <div className="card mb-4 bg-warm-50">
          <div className="font-semibold text-warm-700 mb-3">
            {showEventPicker === 'attended' && '🎤 Concerts We Saw'}
            {showEventPicker === 'favorites' && '⭐ Favorite Events'}
            {showEventPicker === 'all' && '📅 All Events'}
          </div>

          {showEventPicker === 'attended' && (
            <EventPicker events={attendedEvents} selectedDate={selectedDate} onSelectEvent={selectEvent} title="Tap to see ages!" />
          )}
          {showEventPicker === 'favorites' && (
            <EventPicker events={favEvents} selectedDate={selectedDate} onSelectEvent={selectEvent} title="Tap to see ages!" />
          )}
          {showEventPicker === 'all' && (
            <EventPicker events={events} selectedDate={selectedDate} onSelectEvent={selectEvent} title="Tap to see ages!" />
          )}
        </div>
      )}

      {/* Selected Event Banner - Shows what event is selected */}
      {selectedEvent && (
        <div className="card mb-4 bg-sienna-500 text-white">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{selectedEvent.emoji || '📅'}</div>
            <div className="flex-1">
              <div className="font-bold text-lg">{selectedEvent.name}</div>
              <div className="text-sienna-200 text-sm">{formatDate(selectedEvent.date)}</div>
            </div>
            <button
              onClick={selectToday}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-medium transition-colors"
            >
              × Clear
            </button>
          </div>
        </div>
      )}

      {/* Results - Ages on selected date */}
      {selectedPeople.length > 0 ? (
        <div className="card bg-gradient-to-br from-sienna-50 to-white">
          <div className="card-header">
            <Cake className="w-5 h-5 text-sienna-500" />
            {selectedEvent ? (
              <span>Ages at <strong>{selectedEvent.name}</strong></span>
            ) : (
              <span>Ages on {formatDate(selectedDate)}</span>
            )}
          </div>
          <div className="space-y-1">
            {selectedPeople
              .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
              .map(p => (
                <PersonRow
                  key={p.id}
                  person={p}
                  showHeart={true}
                  onToggleFavorite={onToggleFavorite}
                  dateForAge={selectedDate}
                />
              ))}
          </div>

          {/* Clear all button */}
          <button
            onClick={() => setSelected([])}
            className="w-full mt-3 py-2 text-sm text-warm-500 hover:text-warm-700 font-medium"
          >
            Clear All People
          </button>
        </div>
      ) : (
        <div className="card">
          <div className="empty-state">
            <div className="icon">👆</div>
            <div className="message">
              Tap the buttons above to pick people!
              <br />
              <span className="text-sm text-warm-400">No typing needed 😊</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PeoplePage({ people, groups = [], onToggleFavorite, onSelectPerson, loading }) {
  const [search, setSearch] = useState('')
  const favorites = people.filter(p => p.isFavorite)

  // Group people by their actual group
  const familyMembers = people.filter(p => p.type === 'family')
  const peopleWithGroups = people.filter(p => p.group_id && p.type !== 'family')
  const peopleWithoutGroups = people.filter(p => !p.group_id && p.type !== 'family')

  // Get unique group IDs that have people
  const groupsWithPeople = groups.filter(g =>
    peopleWithGroups.some(p => p.group_id === g.id)
  )

  const filtered = search
    ? people.filter(p =>
        (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.nickname || '').toLowerCase().includes(search.toLowerCase()) ||
        (p.group_name || '').toLowerCase().includes(search.toLowerCase())
      )
    : null

  if (loading) return <LoadingSpinner />

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Users className="w-6 h-6" />
        People
      </h1>

      {favorites.length > 0 && (
        <div className="mb-4">
          <div className="section-header flex items-center gap-1">
            <Star className="w-3 h-3" /> Favorites
          </div>
          <div className="flex flex-wrap gap-2">
            {favorites.map(p => (
              <Pill key={p.id} item={p} onClick={() => onSelectPerson(p)} />
            ))}
          </div>
        </div>
      )}

      <div className="search-box">
        <Search className="w-5 h-5 text-warm-400" />
        <input
          type="text"
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered ? (
        <div className="card">
          {filtered.length > 0 ? (
            <div className="space-y-1">
              {filtered.map(p => (
                <PersonRow
                  key={p.id}
                  person={p}
                  onToggleFavorite={onToggleFavorite}
                  onClick={() => onSelectPerson(p)}
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
      ) : (
        <>
          {/* Family */}
          {familyMembers.length > 0 && (
            <div className="card mb-4">
              <div className="card-header text-warm-600">
                <Heart className="w-5 h-5" />
                Our Family
              </div>
              <div className="space-y-1">
                {familyMembers.map(p => (
                  <PersonRow
                    key={p.id}
                    person={p}
                    onToggleFavorite={onToggleFavorite}
                    onClick={() => onSelectPerson(p)}
                    showGroup={false}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Each group gets its own section */}
          {groupsWithPeople.map(group => {
            const groupPeople = peopleWithGroups.filter(p => p.group_id === group.id)
            return (
              <div key={group.id} className="card mb-4">
                <div className="card-header text-warm-600">
                  <span className="text-lg mr-1">{group.emoji || '👥'}</span>
                  {group.name}
                </div>
                <div className="space-y-1">
                  {groupPeople.map(p => (
                    <PersonRow
                      key={p.id}
                      person={p}
                      onToggleFavorite={onToggleFavorite}
                      onClick={() => onSelectPerson(p)}
                      showGroup={false}
                    />
                  ))}
                </div>
              </div>
            )
          })}

          {/* People without groups */}
          {peopleWithoutGroups.length > 0 && (
            <div className="card">
              <div className="card-header text-warm-600">
                <Star className="w-5 h-5" />
                Others
              </div>
              <div className="space-y-1">
                {peopleWithoutGroups.map(p => (
                  <PersonRow
                    key={p.id}
                    person={p}
                    onToggleFavorite={onToggleFavorite}
                    onClick={() => onSelectPerson(p)}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function SongsPage({ works, people, family, onToggleFavorite, onSelectSong, loading }) {
  if (loading) return <LoadingSpinner />

  const albums = works.filter(w => w.type === 'album')
  // Include singles AND songs (individual tracks)
  const allSongs = works.filter(w => w.type === 'single' || w.type === 'song')

  // Group songs by their group_id for better organization
  const songsByGroup = {}
  allSongs.forEach(song => {
    const groupId = song.group_id || 'other'
    if (!songsByGroup[groupId]) {
      songsByGroup[groupId] = []
    }
    songsByGroup[groupId].push(song)
  })

  // Get group names for display (using actual database group_ids)
  const groupNames = {
    'xomgpop': 'XOMG POP!',
    'sharer-fam': 'Stephen Sharer',
    'spy-ninjas': 'Spy Ninjas',
    'fun-squad': 'Ninja Kidz',
    'kidz-bop': 'Kidz Bop',
    'ninja-kidz': 'Ninja Kidz',
    'stephen-sharer': 'Stephen Sharer',
    'other': 'Other Songs'
  }

  const groupColors = {
    'xomgpop': 'from-pink-400 to-purple-500',
    'sharer-fam': 'from-blue-400 to-cyan-500',
    'spy-ninjas': 'from-red-500 to-orange-500',
    'fun-squad': 'from-green-500 to-emerald-500',
    'kidz-bop': 'from-yellow-400 to-orange-400',
    'ninja-kidz': 'from-green-500 to-emerald-500',
    'stephen-sharer': 'from-blue-400 to-cyan-500',
    'other': 'from-gray-400 to-gray-500'
  }

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Disc3 className="w-6 h-6" />
        Songs
      </h1>

      {/* Albums */}
      {albums.length > 0 && (
        <div className="mb-4">
          {albums.map(album => (
            <div
              key={album.id}
              className="card cursor-pointer hover:shadow-lg transition-shadow mb-3"
              style={{ background: 'linear-gradient(135deg, #FFD700, #FFA500)' }}
              onClick={() => onSelectSong(album)}
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-3xl">
                  {album.emoji || '💿'}
                </div>
                <div className="flex-1 text-white">
                  <div className="font-bold text-lg">{album.name}</div>
                  <div className="opacity-90 text-sm">Album • {formatDate(album.release_date)}</div>
                  <div className="text-sm mt-1 opacity-80">Tap to see who was in the band!</div>
                </div>
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Songs grouped by artist/band */}
      {Object.keys(songsByGroup).map(groupId => (
        <div key={groupId} className="card mb-4">
          <div className={`card-header bg-gradient-to-r ${groupColors[groupId] || groupColors.other} text-white rounded-t-xl -mx-4 -mt-4 px-4 py-3 mb-3`}>
            <Music className="w-5 h-5" />
            {groupNames[groupId] || groupId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
            <span className="ml-auto text-sm opacity-80">{songsByGroup[groupId].length} songs</span>
          </div>
          <div className="space-y-1">
            {songsByGroup[groupId].map(song => (
              <div
                key={song.id}
                className="item-row cursor-pointer hover:bg-sienna-50"
                onClick={() => onSelectSong(song)}
              >
                <div className="avatar bg-pink-100">
                  <span>{song.emoji || '🎵'}</span>
                </div>
                <div className="info">
                  <div className="name">{song.name}</div>
                  <div className="meta">{formatDate(song.release_date)}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-warm-300" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Show message if no songs */}
      {albums.length === 0 && allSongs.length === 0 && (
        <div className="text-center text-warm-500 py-8">
          No songs yet!
        </div>
      )}
    </div>
  )
}

function EventsPage({ events, people, family, onToggleFavorite, loading }) {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const attended = events.filter(e => e.attended)

  if (loading) return <LoadingSpinner />

  if (selectedEvent) {
    const bandMembers = people.filter(p =>
      p.joined_date &&
      new Date(p.joined_date) <= new Date(selectedEvent.date) &&
      (!p.left_date || new Date(p.left_date) > new Date(selectedEvent.date))
    )

    return (
      <div className="p-4 pb-24 animate-fade-in">
        <BackButton onClick={() => setSelectedEvent(null)} />

        <div className="card mb-4 bg-gradient-to-br from-purple-500 to-purple-700 text-white">
          <div className="text-center py-6">
            <div className="text-5xl mb-2">{selectedEvent.emoji || '📅'}</div>
            <h2 className="text-2xl font-display font-bold">{selectedEvent.name}</h2>
            <p className="opacity-90">{formatDate(selectedEvent.date)}</p>
            {selectedEvent.description && <p className="mt-2 text-sm">{selectedEvent.description}</p>}
          </div>
        </div>

        {bandMembers.length > 0 && (
          <div className="card mb-4 bg-gradient-to-br from-yellow-50 to-white">
            <div className="card-header text-yellow-600">
              <Music className="w-5 h-5" />
              Band Members
            </div>
            <div className="space-y-1">
              {bandMembers.map(m => (
                <PersonRow
                  key={m.id}
                  person={m}
                  showHeart={false}
                  dateForAge={selectedEvent.date}
                />
              ))}
            </div>
          </div>
        )}

        {family.length > 0 && (
          <div className="card bg-gradient-to-br from-blue-50 to-white">
            <div className="card-header text-blue-600">
              <Users className="w-5 h-5" />
              Our Family
            </div>
            <div className="space-y-1">
              {family.map(f => (
                <PersonRow
                  key={f.id}
                  person={f}
                  showHeart={false}
                  dateForAge={selectedEvent.date}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-4 pb-24 animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-sienna-700 mb-4 flex items-center gap-2">
        <Calendar className="w-6 h-6" />
        Events
      </h1>

      {attended.length > 0 && (
        <div className="card bg-gradient-to-br from-sage-50 to-white mb-4">
          <div className="card-header text-sage-600">
            <Sparkles className="w-5 h-5" />
            Shows We Saw!
          </div>
          <div className="space-y-1">
            {attended.map(e => (
              <div
                key={e.id}
                className="item-row cursor-pointer hover:bg-sage-50"
                onClick={() => setSelectedEvent(e)}
              >
                <div className="avatar bg-sage-100">
                  <span>{e.emoji || '📅'}</span>
                </div>
                <div className="info">
                  <div className="name">{e.name}</div>
                  <div className="meta">{formatDate(e.date)}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-warm-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <Calendar className="w-5 h-5 text-sienna-500" />
          All Events
        </div>
        {events.length > 0 ? (
          <div className="space-y-1">
            {events.map(e => (
              <div
                key={e.id}
                className="item-row cursor-pointer hover:bg-sienna-50"
                onClick={() => setSelectedEvent(e)}
              >
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
                <ChevronRight className="w-5 h-5 text-warm-300" />
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

function GroupsPage({ groups, events, people, family, onToggleFavorite, loading }) {
  const [selectedGroup, setSelectedGroup] = useState(null)

  if (loading) return <LoadingSpinner />

  if (selectedGroup) {
    const groupEvents = events.filter(e => e.group_id === selectedGroup.id)
    const groupMembers = people.filter(p => p.group_id === selectedGroup.id)
    const currentMembers = groupMembers.filter(m => !m.left_date)
    const formerMembers = groupMembers.filter(m => m.left_date)

    return (
      <div className="p-4 pb-24 animate-fade-in">
        <BackButton onClick={() => setSelectedGroup(null)} />

        <div className="card bg-gradient-to-br from-pink-100 to-white mb-4">
          <div className="text-center py-4">
            <div className="text-5xl mb-2">{selectedGroup.emoji || '🎵'}</div>
            <h2 className="text-2xl font-display font-bold text-sienna-700">{selectedGroup.name}</h2>
            <p className="text-sienna-500 capitalize">{selectedGroup.type}</p>
            {selectedGroup.description && (
              <p className="text-sm text-warm-500 mt-2">{selectedGroup.description}</p>
            )}
            {selectedGroup.start_date && (
              <p className="text-xs text-warm-400 mt-2">
                {formatDate(selectedGroup.start_date)} - {selectedGroup.end_date ? formatDate(selectedGroup.end_date) : 'Present'}
              </p>
            )}
          </div>
        </div>

        {/* Current Members */}
        {currentMembers.length > 0 && (
          <div className="card mb-4">
            <div className="card-header text-purple-600">
              <Music className="w-5 h-5" />
              Current Members
            </div>
            <div className="space-y-1">
              {currentMembers.map(m => (
                <PersonRow key={m.id} person={m} showHeart={false} />
              ))}
            </div>
          </div>
        )}

        {/* Former Members */}
        {formerMembers.length > 0 && (
          <div className="card mb-4">
            <div className="card-header text-warm-500">
              <Users className="w-5 h-5" />
              Former Members
            </div>
            <div className="space-y-1">
              {formerMembers.map(m => (
                <PersonRow key={m.id} person={{...m, color: '#999'}} showHeart={false} />
              ))}
            </div>
          </div>
        )}

        {groupEvents.length > 0 && (
          <div className="card">
            <div className="card-header">
              <Calendar className="w-5 h-5 text-sienna-500" />
              Timeline
            </div>
            <div className="space-y-1">
              {groupEvents.sort((a, b) => new Date(a.date) - new Date(b.date)).map(e => (
                <div key={e.id} className="item-row">
                  <div className="avatar">
                    <span>{e.emoji || '📅'}</span>
                  </div>
                  <div className="info">
                    <div className="name">{e.name}</div>
                    <div className="meta">{formatDate(e.date)}</div>
                    {e.description && <div className="text-xs text-warm-400">{e.description}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

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
              <div
                key={g.id}
                className="item-row cursor-pointer hover:bg-sienna-50"
                onClick={() => setSelectedGroup(g)}
              >
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
                  onToggle={(e) => { e.stopPropagation(); onToggleFavorite(g.id) }}
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
  const [data, setData] = useState({ people: [], events: [], groups: [], works: [] })
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const [people, events, groups, works] = await Promise.all([
          fetchPeople(),
          fetchEvents(),
          fetchGroups(),
          fetchWorks()
        ])
        setData({ people, events, groups, works })
      } catch (err) {
        console.error('Failed to load data:', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const family = data.people.filter(p => p.type === 'family')

  const toggleFavorite = async (type, id) => {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    }))

    const itemType = type === 'people' ? 'person' : type === 'works' ? 'work' : type.slice(0, -1)
    try {
      await toggleFavoriteAPI(itemType, id)
    } catch (err) {
      console.error('Failed to toggle favorite:', err)
      setData(prev => ({
        ...prev,
        [type]: prev[type].map(item =>
          item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        )
      }))
    }
  }

  // Handle detail views
  if (selectedPerson) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-sienna-50">
        <header className="bg-gradient-to-r from-sienna-500 to-sienna-600 text-white p-4 safe-top">
          <h1 className="text-xl font-display font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            sienna
          </h1>
        </header>
        <PersonDetailView
          person={selectedPerson}
          family={family}
          onBack={() => setSelectedPerson(null)}
        />
      </div>
    )
  }

  if (selectedSong) {
    return (
      <div className="min-h-screen min-h-[100dvh] bg-sienna-50">
        <header className="bg-gradient-to-r from-sienna-500 to-sienna-600 text-white p-4 safe-top">
          <h1 className="text-xl font-display font-bold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            sienna
          </h1>
        </header>
        <SongDetailView
          song={selectedSong}
          people={data.people}
          family={family}
          works={data.works}
          onBack={() => setSelectedSong(null)}
        />
      </div>
    )
  }

  const renderPage = () => {
    switch (page) {
      case 'people':
        return <PeoplePage
          people={data.people}
          groups={data.groups}
          onToggleFavorite={(id) => toggleFavorite('people', id)}
          onSelectPerson={setSelectedPerson}
          loading={loading}
        />
      case 'songs':
        return <SongsPage
          works={data.works}
          people={data.people}
          family={family}
          onToggleFavorite={(id) => toggleFavorite('works', id)}
          onSelectSong={setSelectedSong}
          loading={loading}
        />
      case 'events':
        return <EventsPage
          events={data.events}
          people={data.people}
          family={family}
          onToggleFavorite={(id) => toggleFavorite('events', id)}
          loading={loading}
        />
      case 'groups':
        return <GroupsPage
          groups={data.groups}
          events={data.events}
          people={data.people}
          family={family}
          onToggleFavorite={(id) => toggleFavorite('groups', id)}
          loading={loading}
        />
      case 'timeline':
      default:
        return <TimelinePage
          people={data.people}
          events={data.events}
          groups={data.groups}
          onToggleFavorite={(id) => toggleFavorite('events', id)}
          loading={loading}
        />
    }
  }

  return (
    <div className="min-h-screen min-h-[100dvh] bg-sienna-50">
      <header className="bg-gradient-to-r from-sienna-500 to-sienna-600 text-white p-4 safe-top">
        <h1 className="text-xl font-display font-bold flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          sienna
        </h1>
        <p className="text-sienna-100 text-sm">How old was everyone?</p>
      </header>

      <main className="pb-20">
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-sienna-100 safe-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center max-w-md mx-auto px-2 py-2">
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
            label="Songs"
            icon={Disc3}
            active={page === 'songs'}
            onClick={() => setPage('songs')}
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
