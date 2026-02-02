import React, { useState, useEffect, useRef } from 'react'
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
  MapPin,
  User,
  Link,
  X
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
    case 'family': return '#C9A89D'  // blush
    case 'youtuber': return '#8B7355' // sienna
    case 'musician': return '#A8BCC8' // dusty blue
    default: return '#8B7355'
  }
}

// ============ COMPONENTS ============

function NavButton({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center gap-1 py-2 px-3 min-w-[56px]
        rounded-xl font-medium transition-all duration-200
        ${active
          ? 'bg-sienna-400 text-white shadow-soft'
          : 'text-warm-400 hover:text-sienna-500 hover:bg-warm-50'
        }
      `}
    >
      <Icon className={`w-4 h-4 ${active ? '' : 'opacity-80'}`} />
      <span className="text-[10px]">{label}</span>
    </button>
  )
}

function BackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mb-4 px-3 py-1.5 bg-sienna-400 text-white rounded-full font-medium text-sm flex items-center gap-1"
    >
      <ArrowLeft className="w-3.5 h-3.5" /> Back
    </button>
  )
}

function HeartButton({ isFavorite, onToggle }) {
  return (
    <button onClick={onToggle} className="heart-btn">
      <Heart
        className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-blush-400 text-blush-400' : 'text-warm-300'}`}
      />
    </button>
  )
}

// Context menu for long-press (mobile) / right-click (desktop)
function PersonContextMenu({ person, position, onClose, onToggleFavorite, onViewProfile, onShowGroup }) {
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [onClose])

  if (!position) return null

  const handleFavorite = async () => {
    if (onToggleFavorite) {
      await onToggleFavorite(person.id)
    }
    onClose()
  }

  const handleShowGroup = () => {
    if (onShowGroup && person.group_id) {
      onShowGroup(person.group_id)
    }
    onClose()
  }

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-white rounded-xl shadow-xl border border-warm-200 overflow-hidden min-w-[200px] animate-fade-in"
      style={{
        left: Math.min(position.x, window.innerWidth - 220),
        top: Math.min(position.y, window.innerHeight - 250)
      }}
    >
      {/* Header */}
      <div className="px-3 py-2 bg-warm-50 border-b border-warm-100 flex items-center gap-2">
        <span className="text-lg">{person.emoji || '👤'}</span>
        <span className="font-medium text-warm-700 truncate">{person.nickname || person.name}</span>
      </div>

      {/* Options */}
      <div className="py-1">
        {onViewProfile && (
          <button
            onClick={() => { onViewProfile(person); onClose(); }}
            className="w-full px-3 py-2.5 text-left flex items-center gap-3 hover:bg-warm-50 active:bg-warm-100"
          >
            <User className="w-4 h-4 text-warm-500" />
            <span>View Profile</span>
          </button>
        )}

        <button
          onClick={handleFavorite}
          className="w-full px-3 py-2.5 text-left flex items-center gap-3 hover:bg-warm-50 active:bg-warm-100"
        >
          <Heart className={`w-4 h-4 ${person.isFavorite ? 'fill-blush-400 text-blush-400' : 'text-warm-500'}`} />
          <span>{person.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
        </button>

        {person.group_name && onShowGroup && (
          <button
            onClick={handleShowGroup}
            className="w-full px-3 py-2.5 text-left flex items-center gap-3 hover:bg-warm-50 active:bg-warm-100"
          >
            <Users className="w-4 h-4 text-warm-500" />
            <span className="truncate">See {person.group_name}</span>
          </button>
        )}
      </div>

      {/* Cancel */}
      <div className="border-t border-warm-100">
        <button
          onClick={onClose}
          className="w-full px-3 py-2 text-center text-warm-500 hover:bg-warm-50 active:bg-warm-100 font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

// Hook to handle long press
function useLongPress(callback, ms = 500) {
  const timerRef = useRef(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const start = (e) => {
    e.preventDefault()
    timerRef.current = setTimeout(() => {
      const touch = e.touches?.[0] || e
      callbackRef.current({ x: touch.clientX, y: touch.clientY })
    }, ms)
  }

  const stop = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
    onContextMenu: (e) => {
      e.preventDefault()
      callbackRef.current({ x: e.clientX, y: e.clientY })
    }
  }
}

function PersonRow({ person, showHeart = true, onToggleFavorite, onViewProfile, onShowGroup, dateForAge = null, onClick, showStatus = false, showGroup = true }) {
  const [menuPos, setMenuPos] = useState(null)
  const age = calcAge(person.birthday, dateForAge)
  const isHighlight = person.type === 'family' && person.name?.toLowerCase().includes('sienna')
  const longPressHandlers = useLongPress((pos) => setMenuPos(pos))

  return (
    <>
      <div
        className={`item-row ${isHighlight ? 'highlight' : ''} ${onClick ? 'cursor-pointer hover:bg-warm-50' : ''}`}
        onClick={onClick}
        {...longPressHandlers}
      >
        <div className="avatar bg-warm-100">
          <span className="text-base">{person.emoji || '👤'}</span>
        </div>
        <div className="info">
          <div className="name flex items-center gap-1">
            {person.nickname || person.name}
            {person.isFavorite && <Heart className="w-2.5 h-2.5 fill-blush-400 text-blush-400" />}
          </div>
          {/* Show group/channel association - subtle gray */}
          {showGroup && person.group_name && person.type !== 'family' && (
            <div className="text-xs text-warm-400 flex items-center gap-1">
              <span className="text-sm">{person.group_emoji || '📺'}</span>
              <span>{person.group_name}</span>
            </div>
          )}
          <div className="meta flex items-center gap-1">
            <Cake className="w-2.5 h-2.5" />
            {formatDate(person.birthday)}
          </div>
          {showStatus && person.left_date && (
            <div className="text-xs text-warm-400">(left group)</div>
          )}
        </div>
        {/* Consistent neutral age badge */}
        <span className="age-badge bg-sienna-400 text-white text-xs">{age}</span>
        {onClick && <ChevronRight className="w-3.5 h-3.5 text-warm-300" />}
      </div>

      {/* Context menu */}
      {menuPos && (
        <PersonContextMenu
          person={person}
          position={menuPos}
          onClose={() => setMenuPos(null)}
          onToggleFavorite={onToggleFavorite}
          onViewProfile={onViewProfile}
          onShowGroup={onShowGroup}
        />
      )}
    </>
  )
}

function Pill({ item, selected, onClick, onToggleFavorite, onViewProfile, onShowGroup }) {
  const [menuPos, setMenuPos] = useState(null)
  const longPressHandlers = useLongPress((pos) => setMenuPos(pos))

  return (
    <>
      <button
        onClick={onClick}
        {...longPressHandlers}
        className={`pill ${selected ? 'selected' : ''}`}
      >
        <span className="emoji text-sm">{item.emoji || '📌'}</span>
        <span className="text-sm">{item.nickname || item.name}</span>
        {item.isFavorite && !selected && (
          <Heart className="w-2.5 h-2.5 fill-blush-400 text-blush-400" />
        )}
      </button>
      {menuPos && (
        <PersonContextMenu
          person={item}
          position={menuPos}
          onClose={() => setMenuPos(null)}
          onToggleFavorite={onToggleFavorite}
          onViewProfile={onViewProfile}
          onShowGroup={onShowGroup}
        />
      )}
    </>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-12">
      <Loader2 className="w-6 h-6 text-sienna-400 animate-spin" />
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
      <div className="card mb-4 bg-gradient-to-br from-warm-100 to-white">
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl bg-sienna-200">
            {person.emoji || '👤'}
          </div>
          <h2 className="text-xl font-display font-bold text-sienna-600">
            {person.nickname || person.name}
          </h2>
          {person.nickname && person.name !== person.nickname && (
            <p className="text-warm-500 text-sm">{person.name}</p>
          )}
          {person.role && (
            <p className="text-sienna-400 text-sm mt-1">{person.role}</p>
          )}
        </div>
      </div>

      {/* Birthday Card */}
      <div className="card mb-4">
        <div className="card-header">
          <Cake className="w-4 h-4 text-sienna-400" />
          Birthday
        </div>
        <div className="p-3">
          <p className="font-semibold">{formatBirthday(person.birthday)}</p>
          <p className="text-warm-500 text-sm">Age now: <strong className="text-sienna-500">{ageNow}</strong></p>
        </div>
      </div>

      {/* Ages at Key Moments - for band members */}
      {ageAtJoin !== null && (
        <div className="card mb-4">
          <div className="card-header">
            <Clock className="w-4 h-4 text-sienna-400" />
            Ages at Key Moments
          </div>
          <div className="space-y-2 p-3">
            <div className="flex justify-between items-center p-2 bg-dusty-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">Joined Band</div>
                <div className="text-xs text-warm-400">{formatDate(person.joined_date)}</div>
              </div>
              <span className="px-2.5 py-1 bg-dusty-400 text-white rounded-full font-bold text-sm">{ageAtJoin}</span>
            </div>
            {ageAtLeft !== null && (
              <div className="flex justify-between items-center p-2 bg-blush-50 rounded-lg">
                <div>
                  <div className="font-medium text-sm">Left Band</div>
                  <div className="text-xs text-warm-400">{formatDate(person.left_date)}</div>
                </div>
                <span className="px-2.5 py-1 bg-blush-400 text-white rounded-full font-bold text-sm">{ageAtLeft}</span>
              </div>
            )}
            <div className="flex justify-between items-center p-2 bg-sienna-50 rounded-lg">
              <div>
                <div className="font-bold text-sm">Right NOW</div>
                <div className="text-xs text-warm-400">Today!</div>
              </div>
              <span className="px-2.5 py-1 bg-sienna-400 text-white rounded-full font-bold text-sm">{ageNow}</span>
            </div>
          </div>
        </div>
      )}

      {/* Our Family When They Joined - for band members */}
      {person.joined_date && family.length > 0 && (
        <div className="card mb-4 bg-gradient-to-br from-dusty-50 to-white">
          <div className="card-header text-dusty-500">
            <Users className="w-4 h-4" />
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
            <Sparkles className="w-4 h-4 text-sienna-400" />
            Fun Fact
          </div>
          <p className="p-3 text-warm-600 text-sm">{person.fun_fact}</p>
        </div>
      )}

      {/* Current Status */}
      {person.current_status && (
        <div className="card mb-4">
          <div className="card-header">
            <Star className="w-4 h-4 text-sienna-400" />
            Now
          </div>
          <p className="p-3 text-warm-600 text-sm">{person.current_status}</p>
        </div>
      )}

      {/* Instagram */}
      {person.instagram && (
        <div className="card text-center p-3 bg-sienna-400">
          <p className="text-white font-medium flex items-center justify-center gap-2 text-sm">
            <Instagram className="w-4 h-4" />
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
      <div className="card mb-4 bg-sienna-400 text-white">
        <div className="text-center py-4">
          <div className="text-4xl mb-2">{song.emoji || '🎵'}</div>
          <h2 className="text-xl font-display font-bold">{song.name}</h2>
          <p className="opacity-90 text-sm">{song.type} • {formatDate(song.release_date)}</p>
          {song.note && <p className="mt-2 text-sm opacity-80">{song.note}</p>}
        </div>
      </div>

      {/* Album Tracks with Lyrics Links */}
      {albumTracks.length > 0 && (
        <div className="card mb-4 bg-gradient-to-br from-warm-50 to-white">
          <div className="card-header text-sienna-500">
            <Disc3 className="w-4 h-4" />
            {albumTracks.length} Songs on this Album
          </div>
          <div className="space-y-1">
            {albumTracks.map(track => (
              <a
                key={track.id}
                href={track.lyrics_url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="item-row hover:bg-warm-50 cursor-pointer block"
              >
                <div className="avatar bg-warm-100">
                  <span className="text-base">{track.emoji || '🎵'}</span>
                </div>
                <div className="info">
                  <div className="name text-sm">{track.track_number}. {track.name}</div>
                  {track.lyrics_url && (
                    <div className="meta text-dusty-400 text-xs">Tap for lyrics →</div>
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
          className="card mb-4 bg-dusty-400 text-white block hover:shadow-soft transition-shadow"
        >
          <div className="flex items-center gap-3 p-3">
            <div className="text-3xl">📝</div>
            <div className="flex-1">
              <div className="font-bold">View Lyrics</div>
              <div className="opacity-90 text-sm">Tap to sing along!</div>
            </div>
            <ChevronRight className="w-5 h-5" />
          </div>
        </a>
      )}

      {/* Band Members at Release */}
      {bandMembers.length > 0 && (
        <div className="card mb-4 bg-gradient-to-br from-blush-50 to-white">
          <div className="card-header text-blush-500">
            <Music className="w-4 h-4" />
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
        <div className="card bg-gradient-to-br from-dusty-50 to-white">
          <div className="card-header text-dusty-500">
            <Users className="w-4 h-4" />
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
        flex items-center gap-1 px-2.5 py-1.5 whitespace-nowrap
        rounded-full font-medium border transition-all duration-200
        active:scale-95 text-xs flex-shrink-0
        ${isActive
          ? 'bg-sienna-400 text-white border-sienna-400 shadow-soft'
          : 'bg-white text-warm-500 border-warm-200 hover:border-warm-300 hover:bg-warm-50'
        }
      `}
      title={label}
    >
      {shortLabel}
      {count > 0 && (
        <span className={`text-[10px] px-1 py-0.5 rounded-full ${isActive ? 'bg-white/25' : 'bg-warm-100'}`}>
          {count}
        </span>
      )}
    </button>
  )
}

// Scrollable person picker for accessibility - neutral colors
// Long-press or right-click for context menu
function PersonPicker({ people, selected, onToggle, onToggleFavorite, onViewProfile, onShowGroup, title }) {
  const [menuState, setMenuState] = useState({ person: null, position: null })

  if (people.length === 0) return null

  return (
    <div className="mb-2">
      {title && (
        <div className="text-[10px] font-semibold text-warm-400 uppercase tracking-wide mb-1.5 px-1">
          {title}
        </div>
      )}
      <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
        {people.map(p => {
          const isSelected = selected.includes(p.id)
          return (
            <PersonPickerCard
              key={p.id}
              person={p}
              isSelected={isSelected}
              onToggle={() => onToggle(p.id)}
              onLongPress={(pos) => setMenuState({ person: p, position: pos })}
            />
          )
        })}
      </div>

      {/* Context menu */}
      {menuState.person && (
        <PersonContextMenu
          person={menuState.person}
          position={menuState.position}
          onClose={() => setMenuState({ person: null, position: null })}
          onToggleFavorite={onToggleFavorite}
          onViewProfile={onViewProfile}
          onShowGroup={onShowGroup}
        />
      )}
    </div>
  )
}

// Individual card with long-press support
function PersonPickerCard({ person, isSelected, onToggle, onLongPress }) {
  const longPressHandlers = useLongPress(onLongPress)

  return (
    <button
      onClick={onToggle}
      {...longPressHandlers}
      className={`
        flex-shrink-0 flex flex-col items-center gap-0.5 p-2 min-w-[60px]
        rounded-lg border transition-all duration-200 active:scale-95 relative
        ${isSelected
          ? 'bg-sienna-400 text-white border-sienna-400 shadow-soft'
          : 'bg-white text-warm-500 border-warm-200 hover:border-warm-300'
        }
      `}
    >
      <span className="text-xl">{person.emoji || '👤'}</span>
      <span className="text-[10px] font-medium truncate max-w-[56px]">
        {person.nickname || person.name?.split(' ')[0]}
      </span>
      {isSelected && <span className="text-[9px]">✓</span>}
      {/* Small heart indicator if favorite */}
      {person.isFavorite && !isSelected && (
        <Heart className="w-2 h-2 fill-blush-400 text-blush-400 absolute top-0.5 right-0.5" />
      )}
    </button>
  )
}

// Event picker with touchable buttons - neutral colors
function EventPicker({ events, selectedDate, onSelectEvent, title }) {
  if (events.length === 0) return null

  return (
    <div className="mb-3">
      <div className="text-[10px] font-semibold text-warm-400 uppercase tracking-wide mb-2 px-1">
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
                flex-shrink-0 flex flex-col items-center gap-0.5 p-2 min-w-[70px]
                rounded-lg border transition-all duration-200 active:scale-95
                ${isSelected
                  ? 'bg-sienna-400 text-white border-sienna-400 shadow-soft'
                  : 'bg-white text-warm-500 border-warm-200 hover:border-warm-300'
                }
              `}
            >
              <span className="text-lg">{e.emoji || '📅'}</span>
              <span className="text-[10px] font-medium text-center line-clamp-2 max-w-[66px]">
                {e.name}
              </span>
              <span className={`text-[9px] ${isSelected ? 'text-white/80' : 'text-warm-400'}`}>
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
    <div className="p-3 pb-24 animate-fade-in">
      {/* Compact header */}
      <h1 className="text-lg font-display font-bold text-sienna-500 mb-3 flex items-center gap-1.5">
        <Clock className="w-4 h-4" />
        Timeline
      </h1>

      {/* Combined control row - People + Date in one clean line */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        <CategoryButton
          label="Family"
          count={familyMembers.length}
          isActive={showPeoplePicker === 'family'}
          onClick={() => { setShowPeoplePicker(showPeoplePicker === 'family' ? null : 'family'); setShowEventPicker(false); }}
        />
        {groups.slice(0, 3).map(g => {
          const groupPeople = getPeopleInGroup(g.id)
          if (groupPeople.length === 0) return null
          return (
            <CategoryButton
              key={g.id}
              label={g.name}
              count={groupPeople.length}
              isActive={showPeoplePicker === g.id}
              onClick={() => { setShowPeoplePicker(showPeoplePicker === g.id ? null : g.id); setShowEventPicker(false); }}
            />
          )
        })}
        <CategoryButton
          label="More..."
          isActive={showPeoplePicker === 'all'}
          onClick={() => { setShowPeoplePicker(showPeoplePicker === 'all' ? null : 'all'); setShowEventPicker(false); }}
        />
        <span className="text-warm-300 self-center">|</span>
        <CategoryButton
          label="Today"
          isActive={!selectedEvent && selectedDate === new Date().toISOString().split('T')[0]}
          onClick={() => { selectToday(); setShowPeoplePicker(null); }}
        />
        {attendedEvents.length > 0 && (
          <CategoryButton
            label="Events"
            count={attendedEvents.length}
            isActive={showEventPicker === 'attended'}
            onClick={() => { setShowEventPicker(showEventPicker === 'attended' ? false : 'attended'); setShowPeoplePicker(null); }}
          />
        )}
      </div>

      {/* Expandable Person Picker - simplified */}
      {showPeoplePicker && (
        <div className="card mb-3 p-3 bg-warm-50">
          {(() => {
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
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-warm-600 text-sm">{pickerTitle}</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => selectAllInCategory(pickerPeople)}
                      className="text-[10px] px-2 py-1 bg-sienna-400 text-white rounded-full font-medium"
                    >
                      Add All
                    </button>
                    <button
                      onClick={() => clearCategory(pickerPeople)}
                      className="text-[10px] px-2 py-1 bg-warm-200 text-warm-500 rounded-full font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <PersonPicker people={pickerPeople} selected={selected} onToggle={togglePerson} onToggleFavorite={onToggleFavorite} onShowGroup={(gid) => setShowPeoplePicker(gid)} title="" />
              </>
            )
          })()}
        </div>
      )}

      {/* Expandable Event Picker - simplified */}
      {showEventPicker && (
        <div className="card mb-3 p-3 bg-warm-50">
          <div className="font-medium text-warm-600 text-sm mb-2">
            {showEventPicker === 'attended' && '🎤 Shows We Saw'}
            {showEventPicker === 'favorites' && '⭐ Favorites'}
            {showEventPicker === 'all' && '📅 All Events'}
          </div>
          {showEventPicker === 'attended' && (
            <EventPicker events={attendedEvents} selectedDate={selectedDate} onSelectEvent={selectEvent} title="" />
          )}
          {showEventPicker === 'favorites' && (
            <EventPicker events={favEvents} selectedDate={selectedDate} onSelectEvent={selectEvent} title="" />
          )}
          {showEventPicker === 'all' && (
            <EventPicker events={events} selectedDate={selectedDate} onSelectEvent={selectEvent} title="" />
          )}
        </div>
      )}

      {/* Selected Event Banner - compact */}
      {selectedEvent && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-sienna-400 text-white rounded-lg">
          <span className="text-xl">{selectedEvent.emoji || '📅'}</span>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate">{selectedEvent.name}</div>
            <div className="text-sienna-200 text-xs">{formatDate(selectedEvent.date)}</div>
          </div>
          <button
            onClick={selectToday}
            className="px-2 py-1 bg-white/20 rounded-full text-xs"
          >
            ×
          </button>
        </div>
      )}

      {/* Results - Ages on selected date */}
      {selectedPeople.length > 0 ? (
        <div className="card p-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-warm-600 mb-2">
            <Cake className="w-3.5 h-3.5 text-sienna-400" />
            {selectedEvent ? (
              <span>Ages at {selectedEvent.name}</span>
            ) : (
              <span>Ages Today</span>
            )}
          </div>
          <div className="space-y-0.5">
            {selectedPeople
              .sort((a, b) => new Date(a.birthday) - new Date(b.birthday))
              .map(p => (
                <PersonRow
                  key={p.id}
                  person={p}
                  showHeart={true}
                  onToggleFavorite={onToggleFavorite}
                  onShowGroup={(gid) => setShowPeoplePicker(gid)}
                  dateForAge={selectedDate}
                />
              ))}
          </div>
          <button
            onClick={() => setSelected([])}
            className="w-full mt-2 py-1.5 text-xs text-warm-400 hover:text-warm-600 font-medium"
          >
            Clear All
          </button>
        </div>
      ) : (
        <div className="card p-6 text-center">
          <div className="text-3xl mb-2">👆</div>
          <div className="text-warm-500 text-sm">
            Tap buttons above to pick people!
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
    <div className="p-3 pb-24 animate-fade-in">
      <h1 className="text-lg font-display font-bold text-sienna-500 mb-3 flex items-center gap-1.5">
        <Users className="w-4 h-4" />
        People
      </h1>

      {favorites.length > 0 && (
        <div className="mb-3">
          <div className="text-[10px] font-semibold text-warm-400 uppercase tracking-wide mb-1.5 px-1 flex items-center gap-1">
            <Star className="w-2.5 h-2.5" /> Favorites
          </div>
          <div className="flex flex-wrap gap-1.5">
            {favorites.map(p => (
              <Pill key={p.id} item={p} onClick={() => onSelectPerson(p)} />
            ))}
          </div>
        </div>
      )}

      <div className="search-box mb-3">
        <Search className="w-4 h-4 text-warm-400" />
        <input
          type="text"
          placeholder="Search people..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm"
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
            <div className="card mb-3 p-3">
              <div className="flex items-center gap-1.5 text-sm font-medium text-warm-600 mb-2">
                <Heart className="w-3.5 h-3.5 text-blush-400" />
                Our Family
              </div>
              <div className="space-y-0.5">
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
              <div key={group.id} className="card mb-3 p-3">
                <div className="flex items-center gap-1.5 text-sm font-medium text-warm-600 mb-2">
                  <span className="text-base">{group.emoji || '👥'}</span>
                  {group.name}
                </div>
                <div className="space-y-0.5">
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
            <div className="card p-3">
              <div className="flex items-center gap-1.5 text-sm font-medium text-warm-600 mb-2">
                <Star className="w-3.5 h-3.5 text-sienna-400" />
                Others
              </div>
              <div className="space-y-0.5">
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

  // Group ALL works by artist/group (albums, singles, songs together)
  const worksByGroup = {}
  works.forEach(work => {
    // Skip tracks that belong to an album (they'll show when album is tapped)
    if (work.parent_id) return

    const groupId = work.group_id || 'other'
    if (!worksByGroup[groupId]) {
      worksByGroup[groupId] = { albums: [], singles: [] }
    }
    if (work.type === 'album') {
      worksByGroup[groupId].albums.push(work)
    } else if (work.type === 'single' || work.type === 'song') {
      worksByGroup[groupId].singles.push(work)
    }
  })

  // Get group names for display
  const groupNames = {
    'xomgpop': 'XOMG POP!',
    'sharer-fam': 'Stephen Sharer',
    'spy-ninjas': 'Spy Ninjas',
    'fun-squad': 'Ninja Kidz',
    'kidz-bop': 'Kidz Bop',
    'ninja-kidz': 'Ninja Kidz',
    'stephen-sharer': 'Stephen Sharer',
    'other': 'Other'
  }

  const groupEmojis = {
    'xomgpop': '🎀',
    'sharer-fam': '🎬',
    'spy-ninjas': '🥷',
    'fun-squad': '⚡',
    'kidz-bop': '🎤',
    'ninja-kidz': '⚡',
    'other': '🎵'
  }

  // Sort groups - those with albums first
  const sortedGroups = Object.keys(worksByGroup).sort((a, b) => {
    const aHasAlbums = worksByGroup[a].albums.length > 0
    const bHasAlbums = worksByGroup[b].albums.length > 0
    if (aHasAlbums && !bHasAlbums) return -1
    if (!aHasAlbums && bHasAlbums) return 1
    return (groupNames[a] || a).localeCompare(groupNames[b] || b)
  })

  const totalWorks = Object.values(worksByGroup).reduce((sum, g) => sum + g.albums.length + g.singles.length, 0)

  return (
    <div className="p-3 pb-24 animate-fade-in">
      <h1 className="text-lg font-display font-bold text-sienna-500 mb-3 flex items-center gap-1.5">
        <Disc3 className="w-4 h-4" />
        Songs
      </h1>

      {sortedGroups.map(groupId => {
        const group = worksByGroup[groupId]
        const totalCount = group.albums.length + group.singles.length
        if (totalCount === 0) return null

        return (
          <div key={groupId} className="card mb-3 p-3">
            {/* Artist Header */}
            <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-warm-100">
              <span className="text-base">{groupEmojis[groupId] || '🎵'}</span>
              <span className="font-medium text-warm-600 text-sm">
                {groupNames[groupId] || groupId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
              </span>
              <span className="text-[10px] text-warm-400 ml-auto">
                {group.albums.length > 0 && `${group.albums.length} album${group.albums.length > 1 ? 's' : ''}`}
                {group.albums.length > 0 && group.singles.length > 0 && ' · '}
                {group.singles.length > 0 && `${group.singles.length} single${group.singles.length > 1 ? 's' : ''}`}
              </span>
            </div>

            {/* Albums first */}
            {group.albums.map(album => (
              <div
                key={album.id}
                className="flex items-center gap-2 p-2 mb-1.5 bg-warm-50 rounded-lg cursor-pointer hover:bg-warm-100 transition-colors"
                onClick={() => onSelectSong(album)}
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shadow-soft">
                  {album.emoji || '💿'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-warm-600 text-sm truncate">{album.name}</div>
                  <div className="text-[10px] text-warm-400">Album · {formatDate(album.release_date)}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-warm-300" />
              </div>
            ))}

            {/* Singles */}
            {group.singles.length > 0 && (
              <div className="space-y-0.5">
                {group.singles.map(song => (
                  <div
                    key={song.id}
                    className="flex items-center gap-2 p-1.5 rounded-lg cursor-pointer hover:bg-warm-50 transition-colors"
                    onClick={() => onSelectSong(song)}
                  >
                    <div className="w-7 h-7 bg-warm-100 rounded flex items-center justify-center text-sm">
                      {song.emoji || '🎵'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-warm-600 truncate">{song.name}</div>
                      <div className="text-[10px] text-warm-400">
                        {song.type === 'single' ? 'Single' : 'Song'} · {formatDate(song.release_date)}
                      </div>
                    </div>
                    <ChevronRight className="w-3 h-3 text-warm-300" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {/* Empty state */}
      {totalWorks === 0 && (
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
      <div className="p-3 pb-24 animate-fade-in">
        <BackButton onClick={() => setSelectedEvent(null)} />

        <div className="card mb-3 p-4 bg-sienna-400 text-white">
          <div className="text-center">
            <div className="text-3xl mb-2">{selectedEvent.emoji || '📅'}</div>
            <h2 className="text-lg font-display font-bold">{selectedEvent.name}</h2>
            <p className="opacity-90 text-sm">{formatDate(selectedEvent.date)}</p>
            {selectedEvent.description && <p className="mt-2 text-sm opacity-80">{selectedEvent.description}</p>}
          </div>
        </div>

        {bandMembers.length > 0 && (
          <div className="card mb-3 p-3 bg-gradient-to-br from-blush-50 to-white">
            <div className="flex items-center gap-1.5 text-sm font-medium text-blush-500 mb-2">
              <Music className="w-3.5 h-3.5" />
              Band Members
            </div>
            <div className="space-y-0.5">
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
          <div className="card p-3 bg-gradient-to-br from-dusty-50 to-white">
            <div className="flex items-center gap-1.5 text-sm font-medium text-dusty-500 mb-2">
              <Users className="w-3.5 h-3.5" />
              Our Family
            </div>
            <div className="space-y-0.5">
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
    <div className="p-3 pb-24 animate-fade-in">
      <h1 className="text-lg font-display font-bold text-sienna-500 mb-3 flex items-center gap-1.5">
        <Calendar className="w-4 h-4" />
        Events
      </h1>

      {attended.length > 0 && (
        <div className="card p-3 bg-gradient-to-br from-blush-50 to-white mb-3">
          <div className="flex items-center gap-1.5 text-sm font-medium text-blush-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Shows We Saw!
          </div>
          <div className="space-y-0.5">
            {attended.map(e => (
              <div
                key={e.id}
                className="item-row cursor-pointer hover:bg-blush-50"
                onClick={() => setSelectedEvent(e)}
              >
                <div className="avatar bg-blush-100">
                  <span className="text-base">{e.emoji || '📅'}</span>
                </div>
                <div className="info">
                  <div className="name text-sm">{e.name}</div>
                  <div className="meta text-xs">{formatDate(e.date)}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-warm-300" />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-warm-600 mb-2">
          <Calendar className="w-3.5 h-3.5 text-sienna-400" />
          All Events
        </div>
        {events.length > 0 ? (
          <div className="space-y-0.5">
            {events.map(e => (
              <div
                key={e.id}
                className="item-row cursor-pointer hover:bg-warm-50"
                onClick={() => setSelectedEvent(e)}
              >
                <div className="avatar">
                  <span className="text-base">{e.emoji || '📅'}</span>
                </div>
                <div className="info">
                  <div className="name text-sm">{e.name}</div>
                  <div className="meta text-xs">{formatDate(e.date)}</div>
                </div>
                {e.attended && (
                  <span className="text-[10px] text-dusty-400 font-medium">✓ went</span>
                )}
                <ChevronRight className="w-3.5 h-3.5 text-warm-300" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-warm-400 text-sm">No events yet</div>
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
      <div className="p-3 pb-24 animate-fade-in">
        <BackButton onClick={() => setSelectedGroup(null)} />

        <div className="card p-4 bg-gradient-to-br from-blush-50 to-white mb-3">
          <div className="text-center">
            <div className="text-3xl mb-2">{selectedGroup.emoji || '🎵'}</div>
            <h2 className="text-lg font-display font-bold text-sienna-500">{selectedGroup.name}</h2>
            <p className="text-sienna-400 capitalize text-sm">{selectedGroup.type}</p>
            {selectedGroup.description && (
              <p className="text-sm text-warm-500 mt-2">{selectedGroup.description}</p>
            )}
            {selectedGroup.start_date && (
              <p className="text-[10px] text-warm-400 mt-2">
                {formatDate(selectedGroup.start_date)} - {selectedGroup.end_date ? formatDate(selectedGroup.end_date) : 'Present'}
              </p>
            )}
          </div>
        </div>

        {/* Current Members */}
        {currentMembers.length > 0 && (
          <div className="card p-3 mb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-sienna-500 mb-2">
              <Music className="w-3.5 h-3.5" />
              Current Members
            </div>
            <div className="space-y-0.5">
              {currentMembers.map(m => (
                <PersonRow key={m.id} person={m} showHeart={false} />
              ))}
            </div>
          </div>
        )}

        {/* Former Members */}
        {formerMembers.length > 0 && (
          <div className="card p-3 mb-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-warm-400 mb-2">
              <Users className="w-3.5 h-3.5" />
              Former Members
            </div>
            <div className="space-y-0.5">
              {formerMembers.map(m => (
                <PersonRow key={m.id} person={{...m, color: '#A39B8C'}} showHeart={false} />
              ))}
            </div>
          </div>
        )}

        {groupEvents.length > 0 && (
          <div className="card p-3">
            <div className="flex items-center gap-1.5 text-sm font-medium text-warm-600 mb-2">
              <Calendar className="w-3.5 h-3.5 text-sienna-400" />
              Timeline
            </div>
            <div className="space-y-0.5">
              {groupEvents.sort((a, b) => new Date(a.date) - new Date(b.date)).map(e => (
                <div key={e.id} className="item-row">
                  <div className="avatar">
                    <span className="text-base">{e.emoji || '📅'}</span>
                  </div>
                  <div className="info">
                    <div className="name text-sm">{e.name}</div>
                    <div className="meta text-xs">{formatDate(e.date)}</div>
                    {e.description && <div className="text-[10px] text-warm-400">{e.description}</div>}
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
    <div className="p-3 pb-24 animate-fade-in">
      <h1 className="text-lg font-display font-bold text-sienna-500 mb-3 flex items-center gap-1.5">
        <Music className="w-4 h-4" />
        Groups & Shows
      </h1>

      <div className="card p-3">
        {groups.length > 0 ? (
          <div className="space-y-0.5">
            {groups.map(g => (
              <div
                key={g.id}
                className="item-row cursor-pointer hover:bg-warm-50"
                onClick={() => setSelectedGroup(g)}
              >
                <div className="avatar">
                  <span className="text-base">{g.emoji || '🎵'}</span>
                </div>
                <div className="info">
                  <div className="name text-sm">{g.name}</div>
                  <div className="meta capitalize text-xs">{g.type}</div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-warm-300" />
                <HeartButton
                  isFavorite={g.isFavorite}
                  onToggle={(e) => { e.stopPropagation(); onToggleFavorite(g.id) }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-2xl mb-1">🎵</div>
            <div className="text-warm-400 text-sm">No groups yet</div>
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
      <div className="min-h-screen min-h-[100dvh] bg-warm-50">
        <header className="bg-sienna-400 text-white p-3 safe-top">
          <h1 className="text-base font-display font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
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
      <div className="min-h-screen min-h-[100dvh] bg-warm-50">
        <header className="bg-sienna-400 text-white p-3 safe-top">
          <h1 className="text-base font-display font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
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
    <div className="min-h-screen min-h-[100dvh] bg-warm-50">
      <header className="bg-sienna-400 text-white p-3 safe-top">
        <h1 className="text-base font-display font-bold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          sienna
        </h1>
        <p className="text-sienna-100 text-xs">How old was everyone?</p>
      </header>

      <main className="pb-16">
        {renderPage()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-warm-100 safe-bottom shadow-soft">
        <div className="flex justify-around items-center max-w-md mx-auto px-1 py-1.5">
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
