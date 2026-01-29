import React, { useState } from 'react';

// ============ DATA ============

const FAMILY = [
  { id: "sienna", name: "Sienna", birthday: "2010-11-24", emoji: "⭐", type: "family" },
  { id: "daddy", name: "Daddy (Neil)", birthday: "1973-06-07", emoji: "👨", type: "family" },
  { id: "mommy", name: "Mommy (Cheryl)", birthday: "1975-04-21", emoji: "👩", type: "family" }
];

const MEMBERS = [
  {
    id: "kiya",
    name: "Kiya Barczyszyn",
    nickname: "Kiya",
    birthday: "2009-09-14",
    from: "Boise, Idaho",
    role: "Dancer, Singer",
    fun: "Loves vintage records & guitar!",
    joined: "2021-12-16",
    left: "2022-11-01",
    current: "Joined Kidz Bop in 2023, then left to help her mom who was sick",
    instagram: "@kiyabarczyszyn",
    color: "#FF69B4",
    photo: "🎸",
    type: "star"
  },
  {
    id: "brooklynn",
    name: "Brooklynn Pitts",
    nickname: "Brooklynn",
    birthday: "2010-09-28",
    from: "Texas",
    role: "Singer, Dancer",
    fun: "Loves BTS, Chipotle & giraffes!",
    joined: "2021-12-16",
    left: null,
    current: "Still performing! Cast in Camp Rock 3 movie!",
    instagram: "@iambrooklynnpitts",
    color: "#FFD700",
    photo: "🦒",
    type: "star"
  },
  {
    id: "leigha",
    name: "Leigha Rose Sanderson",
    nickname: "Leigha",
    birthday: "2007-04-20",
    from: "Dallas, Texas",
    role: "Singer, Dancer, Ukulele",
    fun: "Loves butterflies! Has Spina Bifida but never gives up!",
    joined: "2021-12-16",
    left: "2023-09-01",
    current: "Dancing at Beyond Belief Dance Company",
    instagram: "@leigha.sanderson",
    color: "#DDA0DD",
    photo: "🦋",
    type: "star"
  },
  {
    id: "dallas",
    name: "Dallas Skye Gatson",
    nickname: "Dallas",
    birthday: "2011-11-17",
    from: "Los Angeles, California",
    role: "Singer, Dancer",
    fun: "Learning 5 languages! Plays piano & bass!",
    joined: "2021-12-16",
    left: null,
    current: "Still performing with the group!",
    instagram: "@dallas.skyes",
    color: "#98D8C8",
    photo: "🎹",
    type: "star"
  },
  {
    id: "kinley",
    name: "Kinley Cunningham",
    nickname: "Kinley Full Out",
    birthday: "2010-12-22",
    from: "Los Angeles, California",
    role: "Dancer, Singer, Actress",
    fun: "Favorite color is RAINBOW! Loves scary movies!",
    joined: "2021-12-16",
    left: "2023-11-01",
    current: "Stars as Kombucha on Nickelodeon Thundermans: Undercover!",
    instagram: "@kinleyfullout",
    color: "#FF6B6B",
    photo: "🌈",
    type: "star"
  },
  {
    id: "tinie",
    name: "Tamara Andreasyan",
    nickname: "Tinie T",
    birthday: "2011-03-13",
    from: "Van Nuys, California",
    role: "Rapper, Dancer",
    fun: "Danced with Taylor Swift! Speaks Armenian!",
    joined: "2021-12-16",
    left: null,
    current: "Still performing with the group!",
    instagram: "@iamtiniet",
    color: "#9B59B6",
    photo: "🎤",
    type: "star"
  },
  {
    id: "bella",
    name: "Isabella Cianni Llerena",
    nickname: "Bella",
    birthday: "2009-09-08",
    from: "Miami, Florida",
    role: "Singer, Dancer",
    fun: "Cuban-American! Loves leopard print!",
    joined: "2021-12-20",
    left: "2023-11-01",
    current: "Dancing and pursuing her dreams!",
    instagram: "@bellacianni",
    color: "#F4A460",
    photo: "🐆",
    type: "star"
  },
  {
    id: "penelope",
    name: "Penelope Anne LeMieux",
    nickname: "Penelope",
    birthday: "2013-07-12",
    from: "California",
    role: "Dancer",
    fun: "Was on AGT with Phil Wright! Sister Londyn is a dancer too!",
    joined: "2023-10-01",
    left: null,
    current: "Newest member! Still performing!",
    instagram: "@penelopelemieux",
    color: "#87CEEB",
    photo: "💃",
    type: "star"
  }
];

const SONGS = [
  { id: "candy-hearts", title: "Candy Hearts", released: "2021-12-17", type: "Single", members: ["kiya", "brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"], note: "First song ever! Performed on Ellen!" },
  { id: "secret-handshake", title: "The Secret Handshake", released: "2022-04-15", type: "Single", members: ["kiya", "brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"], note: "Has a fun dance to go with it!" },
  { id: "merry-go-round", title: "Merry Go Round", released: "2022-08-01", type: "Single", members: ["kiya", "brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"], note: "Performed at AGT Semifinals!" },
  { id: "1234ever", title: "1234EVER", released: "2023-02-01", type: "Single", members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"], note: "About friendship!" },
  { id: "party-album", title: "Party Like a Popstar (Album)", released: "2023-03-10", type: "Album", members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"], note: "First album! 10 songs! 2 by Meghan Trainor!" }
];

const TIMELINE_EVENTS = [
  { id: "show-starts", date: "2021-11-14", title: "TV Show Starts!", desc: "Siwas Dance Pop Revolution on Peacock", icon: "📺", type: "event" },
  { id: "band-formed", date: "2021-12-16", title: "XOMG POP is Born! 🎉", desc: "6 girls chosen! Bella added a few days later!", icon: "⭐", type: "event" },
  { id: "candy-release", date: "2021-12-17", title: "Candy Hearts Released!", desc: "First song ever!", icon: "🍬", type: "song" },
  { id: "ellen-show", date: "2021-12-22", title: "Ellen Show Performance!", desc: "First TV performance!", icon: "📺", type: "event" },
  { id: "dream-tour", date: "2022-01-15", title: "JoJo D.R.E.A.M. Tour!", desc: "XOMG POP opens for JoJo!", icon: "🎤", type: "event" },
  { id: "agt-audition", date: "2022-05-31", title: "AGT Audition!", desc: "They made it through!", icon: "🌟", type: "event" },
  { id: "agt-semi", date: "2022-08-23", title: "AGT Semifinals!", desc: "Performed Merry Go Round!", icon: "🎡", type: "event" },
  { id: "kiya-leaves", date: "2022-11-01", title: "Kiya Leaves 😢", desc: "First member to leave", icon: "👋", type: "departure" },
  { id: "mall-concert", date: "2023-02-18", title: "Mall of America Concert!", desc: "3000+ fans came!", icon: "🏬", type: "event" },
  { id: "album-release", date: "2023-03-10", title: "Album Released! 🎵", desc: "Party Like a Popstar!", icon: "💿", type: "song" },
  { id: "leigha-leaves", date: "2023-09-01", title: "Leigha Leaves 😢", desc: "Went back to dance school", icon: "👋", type: "departure" },
  { id: "penelope-joins", date: "2023-10-01", title: "Penelope Joins! 🎉", desc: "New member from AGT!", icon: "🌟", type: "event" },
  { id: "bella-kinley-leave", date: "2023-11-01", title: "Bella & Kinley Leave 😢", desc: "Two more members go", icon: "👋", type: "departure" },
  { id: "band-ends", date: "2024-11-01", title: "Band Ends 💔", desc: "XOMG POP stops performing", icon: "🌈", type: "event" }
];

// ============ HELPER FUNCTIONS ============

function calcAge(birthday, atDate = new Date()) {
  const birth = new Date(birthday);
  const at = new Date(atDate);
  let age = at.getFullYear() - birth.getFullYear();
  const monthDiff = at.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) age--;
  return age;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function formatBirthday(dateStr) {
  const d = new Date(dateStr);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// ============ COMPONENTS ============

function NavButton({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: "10px 4px", fontSize: "11px", fontWeight: active ? "700" : "500",
      background: active ? "#FF69B4" : "white", color: active ? "white" : "#333",
      border: "2px solid #FF69B4", borderRadius: "12px", cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "2px"
    }}>
      <span style={{ fontSize: "18px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function PersonRow({ name, emoji, birthday, age, isActive = true, highlight = false, color = null }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px",
      background: highlight ? "#FFF0F5" : "white", borderRadius: "10px",
      opacity: isActive ? 1 : 0.75, border: highlight ? "2px solid #FF69B4" : "none"
    }}>
      <span style={{ fontSize: "22px" }}>{emoji}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: "600", fontSize: "14px", color: isActive ? "#333" : "#666" }}>
          {name}
          {!isActive && <span style={{ fontSize: "10px", color: "#888", marginLeft: "4px" }}>(not in band)</span>}
        </div>
        <div style={{ fontSize: "11px", color: "#888" }}>🎂 {formatDate(birthday)}</div>
      </div>
      <span style={{
        background: highlight ? "#FF69B4" : (isActive ? (color || "#666") : "#999"),
        color: "white", padding: "4px 10px", borderRadius: "16px", fontWeight: "700", fontSize: "13px"
      }}>{age}</span>
    </div>
  );
}

function MembersPage({ onSelect }) {
  const current = MEMBERS.filter(m => !m.left);
  const former = MEMBERS.filter(m => m.left);
  
  return (
    <div>
      <h2 style={{ color: "#FF69B4", marginBottom: "12px", fontSize: "20px" }}>👧 Current Members</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
        {current.map(m => (
          <button key={m.id} onClick={() => onSelect(m)} style={{
            display: "flex", alignItems: "center", gap: "12px", padding: "12px",
            background: "white", border: `3px solid ${m.color}`, borderRadius: "14px",
            cursor: "pointer", textAlign: "left"
          }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: m.color,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{m.photo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "16px" }}>{m.nickname}</div>
              <div style={{ fontSize: "11px", color: "#888" }}>🎂 {formatDate(m.birthday)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700", fontSize: "18px", color: m.color }}>{calcAge(m.birthday)}</div>
              <div style={{ fontSize: "10px", color: "#888" }}>years old</div>
            </div>
          </button>
        ))}
      </div>
      
      <h2 style={{ color: "#7B68EE", marginBottom: "12px", fontSize: "20px" }}>💜 Former Members</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {former.map(m => (
          <button key={m.id} onClick={() => onSelect(m)} style={{
            display: "flex", alignItems: "center", gap: "12px", padding: "12px",
            background: "#FAFAFA", border: "3px solid #CCC", borderRadius: "14px",
            cursor: "pointer", textAlign: "left"
          }}>
            <div style={{ width: "50px", height: "50px", borderRadius: "50%", background: "#DDD",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px" }}>{m.photo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "16px", color: "#666" }}>{m.nickname}</div>
              <div style={{ fontSize: "11px", color: "#888" }}>🎂 {formatDate(m.birthday)}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "700", fontSize: "18px", color: "#666" }}>{calcAge(m.birthday)}</div>
              <div style={{ fontSize: "10px", color: "#888" }}>years old</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MemberDetail({ member, onBack }) {
  const ageAtJoin = calcAge(member.birthday, member.joined);
  const ageAtLeft = member.left ? calcAge(member.birthday, member.left) : null;
  
  return (
    <div>
      <button onClick={onBack} style={{
        padding: "10px 18px", background: "#FF69B4", color: "white", border: "none",
        borderRadius: "20px", fontWeight: "600", marginBottom: "16px", cursor: "pointer"
      }}>← Back</button>
      
      <div style={{ background: `${member.color}15`, borderRadius: "20px", padding: "16px", border: `3px solid ${member.color}` }}>
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: member.color,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px", margin: "0 auto 10px" }}>{member.photo}</div>
          <h2 style={{ margin: "0 0 4px", fontSize: "22px" }}>{member.nickname}</h2>
          <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>{member.name}</p>
        </div>
        
        <div style={{ background: "white", borderRadius: "12px", padding: "14px", marginBottom: "10px" }}>
          <h3 style={{ margin: "0 0 6px", color: member.color, fontSize: "14px" }}>📅 Birthday</h3>
          <p style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>{formatBirthday(member.birthday)}</p>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666" }}>Age now: <strong>{calcAge(member.birthday)}</strong></p>
        </div>
        
        <div style={{ background: "white", borderRadius: "12px", padding: "14px", marginBottom: "10px" }}>
          <h3 style={{ margin: "0 0 10px", color: member.color, fontSize: "14px" }}>🎂 Ages at Key Moments</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#E8F5E9", borderRadius: "8px" }}>
              <div><div style={{ fontWeight: "500", fontSize: "13px" }}>Joined Band</div><div style={{ fontSize: "10px", color: "#666" }}>{formatDate(member.joined)}</div></div>
              <span style={{ fontWeight: "700", background: "#4CAF50", color: "white", padding: "4px 10px", borderRadius: "12px" }}>{ageAtJoin}</span>
            </div>
            {ageAtLeft && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#FCE4EC", borderRadius: "8px" }}>
                <div><div style={{ fontWeight: "500", fontSize: "13px" }}>Left Band</div><div style={{ fontSize: "10px", color: "#666" }}>{formatDate(member.left)}</div></div>
                <span style={{ fontWeight: "700", background: "#E91E63", color: "white", padding: "4px 10px", borderRadius: "12px" }}>{ageAtLeft}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", background: "#FFF3E0", borderRadius: "8px" }}>
              <div><div style={{ fontWeight: "700", fontSize: "13px" }}>Right NOW</div><div style={{ fontSize: "10px", color: "#666" }}>Today!</div></div>
              <span style={{ fontWeight: "700", background: "#FF9800", color: "white", padding: "4px 10px", borderRadius: "12px" }}>{calcAge(member.birthday)}</span>
            </div>
          </div>
        </div>
        
        <div style={{ background: "#E3F2FD", borderRadius: "12px", padding: "14px", marginBottom: "10px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#1976D2", fontSize: "14px" }}>👨‍👩‍👧 Our Family When {member.nickname} Joined</h3>
          {FAMILY.map(f => (
            <PersonRow key={f.id} name={f.name} emoji={f.emoji} birthday={f.birthday} 
              age={calcAge(f.birthday, member.joined)} highlight={f.name === "Sienna"} />
          ))}
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div style={{ background: "white", borderRadius: "12px", padding: "12px" }}>
            <h3 style={{ margin: "0 0 4px", color: member.color, fontSize: "12px" }}>📍 From</h3>
            <p style={{ margin: 0, fontSize: "13px" }}>{member.from}</p>
          </div>
          <div style={{ background: "white", borderRadius: "12px", padding: "12px" }}>
            <h3 style={{ margin: "0 0 4px", color: member.color, fontSize: "12px" }}>🎤 Role</h3>
            <p style={{ margin: 0, fontSize: "13px" }}>{member.role}</p>
          </div>
        </div>
        
        <div style={{ background: "white", borderRadius: "12px", padding: "12px", marginBottom: "10px" }}>
          <h3 style={{ margin: "0 0 4px", color: member.color, fontSize: "12px" }}>✨ Fun Fact</h3>
          <p style={{ margin: 0, fontSize: "14px" }}>{member.fun}</p>
        </div>
        
        <div style={{ background: "white", borderRadius: "12px", padding: "12px", marginBottom: "10px" }}>
          <h3 style={{ margin: "0 0 4px", color: member.color, fontSize: "12px" }}>🌟 Now</h3>
          <p style={{ margin: 0, fontSize: "14px" }}>{member.current}</p>
        </div>
        
        <div style={{ background: member.color, borderRadius: "12px", padding: "12px", textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "white", fontWeight: "600" }}>📸 {member.instagram}</p>
        </div>
      </div>
    </div>
  );
}

function SongsPage() {
  const [selected, setSelected] = useState(null);
  
  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{
          padding: "10px 18px", background: "#FF69B4", color: "white", border: "none",
          borderRadius: "20px", fontWeight: "600", marginBottom: "16px", cursor: "pointer"
        }}>← Back</button>
        
        <div style={{ background: "linear-gradient(135deg, #FF69B4, #FF1493)", borderRadius: "16px", padding: "16px", color: "white", marginBottom: "14px" }}>
          <div style={{ fontSize: "36px", marginBottom: "6px" }}>🎵</div>
          <h2 style={{ margin: "0 0 4px", fontSize: "20px" }}>{selected.title}</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "13px" }}>{selected.type} • {formatDate(selected.released)}</p>
          <p style={{ margin: "8px 0 0", fontSize: "14px" }}>{selected.note}</p>
        </div>
        
        <div style={{ background: "#FFF9C4", borderRadius: "14px", padding: "14px", marginBottom: "14px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#F57F17", fontSize: "16px" }}>🎤 Band Members</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {MEMBERS.filter(m => m.id !== "penelope" || new Date(selected.released) >= new Date("2023-10-01")).map(m => (
              <PersonRow key={m.id} name={m.nickname} emoji={m.photo} birthday={m.birthday}
                age={calcAge(m.birthday, selected.released)} isActive={selected.members.includes(m.id)} color={m.color} />
            ))}
          </div>
        </div>
        
        <div style={{ background: "#E1F5FE", borderRadius: "14px", padding: "14px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#0288D1", fontSize: "16px" }}>👨‍👩‍👧 Our Family</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {FAMILY.map(f => (
              <PersonRow key={f.id} name={f.name} emoji={f.emoji} birthday={f.birthday}
                age={calcAge(f.birthday, selected.released)} highlight={f.name === "Sienna"} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 style={{ color: "#FF69B4", marginBottom: "12px", fontSize: "20px" }}>🎵 All Songs</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {SONGS.map(s => (
          <button key={s.id} onClick={() => setSelected(s)} style={{
            display: "flex", alignItems: "center", gap: "10px", padding: "12px",
            background: s.type === "Album" ? "linear-gradient(135deg, #FFD700, #FFA500)" : "white",
            border: s.type === "Album" ? "none" : "2px solid #FF69B4", borderRadius: "12px", cursor: "pointer", textAlign: "left"
          }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: s.type === "Album" ? "white" : "#FF69B4",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>{s.type === "Album" ? "💿" : "🎵"}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "14px", color: s.type === "Album" ? "white" : "#333" }}>{s.title}</div>
              <div style={{ color: s.type === "Album" ? "rgba(255,255,255,0.9)" : "#666", fontSize: "11px" }}>{formatDate(s.released)}</div>
            </div>
            <span style={{ color: s.type === "Album" ? "white" : "#CCC" }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelinePage() {
  const [selected, setSelected] = useState(null);
  
  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} style={{
          padding: "10px 18px", background: "#9B59B6", color: "white", border: "none",
          borderRadius: "20px", fontWeight: "600", marginBottom: "16px", cursor: "pointer"
        }}>← Back</button>
        
        <div style={{ background: "linear-gradient(135deg, #9B59B6, #8E44AD)", borderRadius: "16px", padding: "16px", color: "white", marginBottom: "14px" }}>
          <div style={{ fontSize: "36px", marginBottom: "6px" }}>{selected.icon}</div>
          <h2 style={{ margin: "0 0 4px", fontSize: "20px" }}>{selected.title}</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>{formatDate(selected.date)}</p>
          <p style={{ margin: "8px 0 0", fontSize: "14px" }}>{selected.desc}</p>
        </div>
        
        <div style={{ background: "#FFF9C4", borderRadius: "14px", padding: "14px", marginBottom: "14px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#F57F17", fontSize: "16px" }}>🎤 Band Members</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {MEMBERS.filter(m => m.id !== "penelope" || new Date(selected.date) >= new Date("2023-10-01")).map(m => {
              const d = new Date(selected.date);
              const joined = new Date(m.joined);
              const left = m.left ? new Date(m.left) : new Date("2099-12-31");
              const wasIn = d >= joined && d <= left;
              return <PersonRow key={m.id} name={m.nickname} emoji={m.photo} birthday={m.birthday}
                age={calcAge(m.birthday, selected.date)} isActive={wasIn} color={m.color} />;
            })}
          </div>
        </div>
        
        <div style={{ background: "#E1F5FE", borderRadius: "14px", padding: "14px" }}>
          <h3 style={{ margin: "0 0 10px", color: "#0288D1", fontSize: "16px" }}>👨‍👩‍👧 Our Family</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {FAMILY.map(f => (
              <PersonRow key={f.id} name={f.name} emoji={f.emoji} birthday={f.birthday}
                age={calcAge(f.birthday, selected.date)} highlight={f.name === "Sienna"} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 style={{ color: "#9B59B6", marginBottom: "12px", fontSize: "20px" }}>📅 Timeline</h2>
      <div style={{ position: "relative", paddingLeft: "24px" }}>
        <div style={{ position: "absolute", left: "6px", top: 0, bottom: 0, width: "4px", background: "linear-gradient(180deg, #FF69B4, #9B59B6)", borderRadius: "2px" }} />
        {TIMELINE_EVENTS.map((t, i) => (
          <button key={i} onClick={() => setSelected(t)} style={{
            display: "block", width: "100%", padding: "12px", marginBottom: "8px",
            background: "white", border: t.type === "departure" ? "2px solid #CCC" : "2px solid #FF69B4",
            borderRadius: "12px", cursor: "pointer", textAlign: "left", position: "relative"
          }}>
            <div style={{ position: "absolute", left: "-22px", top: "50%", transform: "translateY(-50%)",
              width: "14px", height: "14px", background: t.type === "departure" ? "#9B59B6" : "#FF69B4",
              borderRadius: "50%", border: "2px solid white" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "20px" }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "700", fontSize: "13px", color: t.type === "departure" ? "#666" : "#333" }}>{t.title}</div>
                <div style={{ color: "#777", fontSize: "11px" }}>{formatDate(t.date)}</div>
              </div>
              <span style={{ color: "#CCC" }}>→</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AgesPage() {
  return (
    <div>
      <h2 style={{ color: "#FF69B4", marginBottom: "14px", fontSize: "20px" }}>🎂 Everyone Today</h2>
      
      <div style={{ background: "linear-gradient(135deg, #FFE4EC, #FFF0F5)", borderRadius: "16px", padding: "14px", marginBottom: "16px", border: "2px solid #FF69B4" }}>
        <h3 style={{ margin: "0 0 10px", color: "#FF69B4", fontSize: "16px" }}>👨‍👩‍👧 Our Family</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FAMILY.map(f => (
            <div key={f.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", background: "white", borderRadius: "10px" }}>
              <span style={{ fontSize: "24px" }}>{f.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", fontSize: "15px" }}>{f.name}</div>
                <div style={{ fontSize: "11px", color: "#888" }}>🎂 {formatDate(f.birthday)}</div>
              </div>
              <span style={{ background: "#FF69B4", color: "white", padding: "5px 12px", borderRadius: "14px", fontWeight: "700" }}>{calcAge(f.birthday)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ background: "#F8F8F8", borderRadius: "16px", padding: "14px", marginBottom: "16px" }}>
        <h3 style={{ margin: "0 0 10px", color: "#7B68EE", fontSize: "16px" }}>🎤 XOMG POP Stars</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {MEMBERS.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)).map(m => (
            <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", background: "white", borderRadius: "10px", opacity: m.left ? 0.8 : 1 }}>
              <span style={{ fontSize: "20px" }}>{m.photo}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "500", fontSize: "14px", color: m.left ? "#666" : "#333" }}>
                  {m.nickname}{m.left && <span style={{ fontSize: "10px", color: "#888", marginLeft: "4px" }}>(left)</span>}
                </div>
                <div style={{ fontSize: "10px", color: "#888" }}>🎂 {formatDate(m.birthday)}</div>
              </div>
              <span style={{ background: m.left ? "#888" : m.color, color: "white", padding: "4px 10px", borderRadius: "12px", fontWeight: "700", fontSize: "13px" }}>{calcAge(m.birthday)}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ background: "#E8F5E9", borderRadius: "16px", padding: "14px" }}>
        <h3 style={{ margin: "0 0 8px", color: "#2E7D32", fontSize: "16px" }}>🌟 Fun Fact!</h3>
        <p style={{ margin: 0, fontSize: "14px", lineHeight: 1.5 }}>
          <strong>Sienna</strong> is the same age as <strong>Brooklynn</strong> (both 2010)! 
          Close to <strong>Kinley</strong> and <strong>Dallas</strong> too!
        </p>
      </div>
    </div>
  );
}

function ComparePage() {
  const [selected, setSelected] = useState(["sienna", "brooklynn"]);
  const allPeople = [...FAMILY, ...MEMBERS.map(m => ({ ...m, emoji: m.photo }))];
  const selectedPeople = allPeople.filter(p => selected.includes(p.id)).sort((a, b) => new Date(a.birthday) - new Date(b.birthday));
  
  const toggle = (id) => {
    if (selected.includes(id)) setSelected(selected.filter(i => i !== id));
    else setSelected([...selected, id]);
  };
  
  return (
    <div>
      <h2 style={{ color: "#9B59B6", marginBottom: "12px", fontSize: "20px" }}>📊 Compare Ages</h2>
      
      <div style={{ background: "#F5F5F5", borderRadius: "14px", padding: "12px", marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px", fontWeight: "600" }}>👆 Tap to add/remove:</div>
        
        <div style={{ marginBottom: "10px" }}>
          <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>FAMILY</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {FAMILY.map(f => (
              <button key={f.id} onClick={() => toggle(f.id)} style={{
                padding: "5px 10px", borderRadius: "16px", border: "2px solid",
                borderColor: selected.includes(f.id) ? "#FF69B4" : "#DDD",
                background: selected.includes(f.id) ? "#FF69B4" : "white",
                color: selected.includes(f.id) ? "white" : "#333",
                fontSize: "12px", fontWeight: "500", cursor: "pointer"
              }}>{f.emoji} {f.name.split(" ")[0]}</button>
            ))}
          </div>
        </div>
        
        <div>
          <div style={{ fontSize: "10px", color: "#888", marginBottom: "4px" }}>XOMG POP</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {MEMBERS.map(m => (
              <button key={m.id} onClick={() => toggle(m.id)} style={{
                padding: "5px 10px", borderRadius: "16px", border: "2px solid",
                borderColor: selected.includes(m.id) ? m.color : "#DDD",
                background: selected.includes(m.id) ? m.color : "white",
                color: selected.includes(m.id) ? "white" : (m.left ? "#888" : "#333"),
                fontSize: "12px", fontWeight: "500", cursor: "pointer", opacity: m.left ? 0.8 : 1
              }}>{m.photo} {m.nickname.split(" ")[0]}</button>
            ))}
          </div>
        </div>
      </div>
      
      {selectedPeople.length > 0 ? (
        <div style={{ background: "white", borderRadius: "14px", padding: "14px", border: "2px solid #9B59B6" }}>
          <h3 style={{ margin: "0 0 12px", color: "#9B59B6", fontSize: "14px" }}>📅 Birthdays (oldest to youngest)</h3>
          
          <div style={{ position: "relative", paddingLeft: "28px" }}>
            <div style={{ position: "absolute", left: "8px", top: 0, bottom: 0, width: "4px", background: "linear-gradient(180deg, #FF69B4, #9B59B6, #4CAF50)", borderRadius: "2px" }} />
            
            {selectedPeople.map((p, i) => (
              <div key={p.id} style={{ position: "relative", marginBottom: "14px" }}>
                <div style={{ position: "absolute", left: "-26px", top: "8px", width: "16px", height: "16px", borderRadius: "50%",
                  background: p.color || "#FF69B4", border: "2px solid white", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }} />
                <div style={{ background: `${p.color || "#FF69B4"}15`, borderRadius: "10px", padding: "10px", borderLeft: `3px solid ${p.color || "#FF69B4"}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "18px" }}>{p.emoji || p.photo}</span>
                    <span style={{ fontWeight: "700", fontSize: "14px" }}>{p.name || p.nickname}</span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#666" }}>🎂 {formatDate(p.birthday)}</div>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: p.color || "#FF69B4", marginTop: "4px" }}>
                    {calcAge(p.birthday)} years old now
                  </div>
                </div>
              </div>
            ))}
            
            <div style={{ position: "relative", marginBottom: "0" }}>
              <div style={{ position: "absolute", left: "-26px", top: "8px", width: "16px", height: "16px", borderRadius: "50%",
                background: "#E91E63", border: "2px solid white" }} />
              <div style={{ background: "#FCE4EC", borderRadius: "10px", padding: "10px", borderLeft: "3px solid #E91E63" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ fontSize: "18px" }}>📍</span>
                  <span style={{ fontWeight: "700", fontSize: "14px" }}>Today!</span>
                </div>
                <div style={{ fontSize: "12px", color: "#666" }}>{formatDate(new Date().toISOString().split('T')[0])}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ background: "#FFF3E0", borderRadius: "14px", padding: "20px", textAlign: "center" }}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>👆</div>
          <p style={{ margin: 0, color: "#E65100", fontSize: "14px" }}>Tap people above to compare!</p>
        </div>
      )}
    </div>
  );
}

// ============ MAIN APP ============

export default function XOMGPopExplorer() {
  const [page, setPage] = useState("members");
  const [selectedMember, setSelectedMember] = useState(null);
  
  const renderPage = () => {
    if (selectedMember) return <MemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} />;
    switch (page) {
      case "members": return <MembersPage onSelect={setSelectedMember} />;
      case "songs": return <SongsPage />;
      case "timeline": return <TimelinePage />;
      case "ages": return <AgesPage />;
      case "compare": return <ComparePage />;
      default: return <MembersPage onSelect={setSelectedMember} />;
    }
  };
  
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #FFF0F5 0%, #FFF 100%)", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg, #FF69B4, #FF1493)", padding: "14px", textAlign: "center", color: "white" }}>
        <h1 style={{ margin: "0 0 2px", fontSize: "22px", textShadow: "1px 1px 3px rgba(0,0,0,0.2)" }}>✨ XOMG POP Explorer ✨</h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "12px" }}>For Sienna 💕</p>
      </div>
      
      <div style={{ display: "flex", gap: "5px", padding: "10px", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <NavButton label="Members" icon="👧" active={page === "members"} onClick={() => { setPage("members"); setSelectedMember(null); }} />
        <NavButton label="Songs" icon="🎵" active={page === "songs"} onClick={() => setPage("songs")} />
        <NavButton label="Timeline" icon="📅" active={page === "timeline"} onClick={() => setPage("timeline")} />
        <NavButton label="Ages" icon="🎂" active={page === "ages"} onClick={() => setPage("ages")} />
        <NavButton label="Compare" icon="📊" active={page === "compare"} onClick={() => setPage("compare")} />
      </div>
      
      <div style={{ padding: "14px", maxWidth: "480px", margin: "0 auto" }}>{renderPage()}</div>
      
      <div style={{ textAlign: "center", padding: "14px", color: "#AAA", fontSize: "10px" }}>Made with 💕 for Sienna • v2</div>
    </div>
  );
}
