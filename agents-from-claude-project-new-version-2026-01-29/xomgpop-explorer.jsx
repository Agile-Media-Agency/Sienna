import React, { useState } from 'react';

// ============ DATA ============

const FAMILY = [
  { name: "Sienna", birthday: "2010-11-24", emoji: "⭐" },
  { name: "Daddy (Neil)", birthday: "1973-06-07", emoji: "👨" },
  { name: "Mommy (Cheryl)", birthday: "1975-04-21", emoji: "👩" }
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
    leftReason: "Left the group",
    current: "Joined Kidz Bop in 2023, then left to help her mom who was sick",
    instagram: "@kiyabarczyszyn",
    color: "#FF69B4",
    photo: "🎸"
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
    photo: "🦒"
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
    leftReason: "Left the group",
    current: "Dancing at Beyond Belief Dance Company",
    instagram: "@leigha.sanderson",
    color: "#DDA0DD",
    photo: "🦋"
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
    photo: "🎹"
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
    leftReason: "Left the group",
    current: "Stars as 'Kombucha' on Nickelodeon's The Thundermans: Undercover!",
    instagram: "@kinleyfullout",
    color: "#FF6B6B",
    photo: "🌈"
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
    photo: "🎤"
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
    leftReason: "Left the group",
    current: "Dancing and pursuing her dreams!",
    instagram: "@bellacianni",
    color: "#F4A460",
    photo: "🐆"
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
    photo: "💃"
  }
];

const SONGS = [
  {
    title: "Candy Hearts",
    released: "2021-12-17",
    type: "Single",
    members: ["kiya", "brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "First song ever! Performed on Ellen!"
  },
  {
    title: "Merry Go Round",
    released: "2022-08-01",
    type: "Single",
    members: ["kiya", "brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "Performed at AGT Semifinals!"
  },
  {
    title: "The Secret Handshake",
    released: "2022-04-15",
    type: "Single",
    members: ["kiya", "brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "Has a fun dance to go with it!"
  },
  {
    title: "1234EVER",
    released: "2023-02-01",
    type: "Single",
    members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "About friendship!"
  },
  {
    title: "Party Like a Popstar (Album)",
    released: "2023-03-10",
    type: "Album",
    members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "First album! 10 songs! 2 by Meghan Trainor!"
  },
  {
    title: "That's What I'm About",
    released: "2023-03-10",
    type: "Album Track",
    members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "From the album!"
  },
  {
    title: "Sparkle Queens",
    released: "2023-03-10",
    type: "Album Track",
    members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "From the album!"
  },
  {
    title: "Disco Believer",
    released: "2023-03-10",
    type: "Album Track",
    members: ["brooklynn", "leigha", "dallas", "kinley", "tinie", "bella"],
    note: "From the album!"
  }
];

const TIMELINE = [
  {
    date: "2021-11-14",
    event: "Siwas Dance Pop Revolution Starts!",
    desc: "The TV show begins on Peacock",
    icon: "📺"
  },
  {
    date: "2021-12-16",
    event: "XOMG POP is Born! 🎉",
    desc: "6 girls chosen! Bella added a few days later!",
    icon: "⭐"
  },
  {
    date: "2021-12-17",
    event: "Candy Hearts Released!",
    desc: "First song ever!",
    icon: "🍬"
  },
  {
    date: "2021-12-22",
    event: "Ellen Show Performance!",
    desc: "First TV performance!",
    icon: "📺"
  },
  {
    date: "2022-01-15",
    event: "JoJo D.R.E.A.M. Tour Begins!",
    desc: "XOMG POP opens for JoJo!",
    icon: "🎤"
  },
  {
    date: "2022-04-15",
    event: "Secret Handshake Released!",
    desc: "Second single with fun dance!",
    icon: "🤝"
  },
  {
    date: "2022-05-31",
    event: "America's Got Talent Audition!",
    desc: "They made it through!",
    icon: "🌟"
  },
  {
    date: "2022-08-23",
    event: "AGT Semifinals!",
    desc: "Performed Merry Go Round!",
    icon: "🎡"
  },
  {
    date: "2022-11-01",
    event: "Kiya Leaves 😢",
    desc: "First member to leave",
    icon: "👋"
  },
  {
    date: "2023-02-18",
    event: "Mall of America Concert!",
    desc: "3000+ fans came!",
    icon: "🏬"
  },
  {
    date: "2023-03-10",
    event: "Album Released! 🎵",
    desc: "Party Like a Popstar - 10 songs!",
    icon: "💿"
  },
  {
    date: "2023-09-01",
    event: "Leigha Leaves 😢",
    desc: "Went back to dance school",
    icon: "👋"
  },
  {
    date: "2023-10-01",
    event: "Penelope Joins! 🎉",
    desc: "New member from AGT!",
    icon: "🌟"
  },
  {
    date: "2023-11-01",
    event: "Bella & Kinley Leave 😢",
    desc: "Two more members go",
    icon: "👋"
  },
  {
    date: "2024-11-01",
    event: "Band Ends 💔",
    desc: "XOMG POP stops performing",
    icon: "🌈"
  }
];

// ============ HELPER FUNCTIONS ============

function calcAge(birthday, atDate = new Date()) {
  const birth = new Date(birthday);
  const at = new Date(atDate);
  let age = at.getFullYear() - birth.getFullYear();
  const monthDiff = at.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && at.getDate() < birth.getDate())) {
    age--;
  }
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
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: "16px 8px",
        fontSize: "14px",
        fontWeight: active ? "700" : "500",
        background: active ? "#FF69B4" : "white",
        color: active ? "white" : "#333",
        border: "3px solid #FF69B4",
        borderRadius: "16px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease",
        boxShadow: active ? "0 4px 12px rgba(255,105,180,0.4)" : "none"
      }}
    >
      <span style={{ fontSize: "24px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function AgeBox({ name, emoji, age, highlight }) {
  return (
    <div style={{
      background: highlight ? "#FFF0F5" : "#F8F8F8",
      padding: "10px 14px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: highlight ? "2px solid #FF69B4" : "2px solid transparent"
    }}>
      <span style={{ fontSize: "20px" }}>{emoji}</span>
      <span style={{ fontWeight: "600", color: "#333" }}>{name}</span>
      <span style={{ 
        marginLeft: "auto", 
        background: highlight ? "#FF69B4" : "#DDD",
        color: highlight ? "white" : "#333",
        padding: "4px 10px",
        borderRadius: "20px",
        fontWeight: "700",
        fontSize: "14px"
      }}>
        {age} years old
      </span>
    </div>
  );
}

function MembersPage({ onSelectMember }) {
  const current = MEMBERS.filter(m => !m.left);
  const former = MEMBERS.filter(m => m.left);
  
  return (
    <div>
      <h2 style={{ color: "#FF69B4", marginBottom: "8px", fontSize: "24px" }}>
        👧 Current Members
      </h2>
      <p style={{ color: "#666", marginBottom: "16px", fontSize: "16px" }}>
        Tap a member to learn more!
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
        {current.map(m => (
          <button
            key={m.id}
            onClick={() => onSelectMember(m)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "white",
              border: `3px solid ${m.color}`,
              borderRadius: "16px",
              cursor: "pointer",
              textAlign: "left",
              transition: "transform 0.2s ease"
            }}
          >
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: m.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px"
            }}>
              {m.photo}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "18px", color: "#333" }}>
                {m.nickname}
              </div>
              <div style={{ color: "#666", fontSize: "14px" }}>
                {m.role}
              </div>
              <div style={{ 
                color: m.color, 
                fontWeight: "600",
                fontSize: "15px",
                marginTop: "4px"
              }}>
                Age NOW: {calcAge(m.birthday)} years old
              </div>
            </div>
            <div style={{ fontSize: "24px", color: "#CCC" }}>→</div>
          </button>
        ))}
      </div>
      
      <h2 style={{ color: "#9B59B6", marginBottom: "8px", fontSize: "24px" }}>
        💜 Former Members
      </h2>
      <p style={{ color: "#666", marginBottom: "16px", fontSize: "16px" }}>
        They were in the band before
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {former.map(m => (
          <button
            key={m.id}
            onClick={() => onSelectMember(m)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: "#FAFAFA",
              border: "3px solid #DDD",
              borderRadius: "16px",
              cursor: "pointer",
              textAlign: "left",
              opacity: 0.85
            }}
          >
            <div style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#E0E0E0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px"
            }}>
              {m.photo}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "18px", color: "#666" }}>
                {m.nickname}
              </div>
              <div style={{ color: "#888", fontSize: "14px" }}>
                Left in {new Date(m.left).getFullYear()}
              </div>
              <div style={{ 
                color: "#666", 
                fontWeight: "600",
                fontSize: "15px",
                marginTop: "4px"
              }}>
                Age NOW: {calcAge(m.birthday)} years old
              </div>
            </div>
            <div style={{ fontSize: "24px", color: "#CCC" }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MemberDetail({ member, onBack }) {
  const ageAtJoin = calcAge(member.birthday, member.joined);
  const ageAtLeft = member.left ? calcAge(member.birthday, member.left) : null;
  const ageNow = calcAge(member.birthday);
  
  return (
    <div>
      <button
        onClick={onBack}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "12px 20px",
          background: "#FF69B4",
          color: "white",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "16px",
          marginBottom: "20px"
        }}
      >
        ← Back to Members
      </button>
      
      <div style={{
        background: `linear-gradient(135deg, ${member.color}20, white)`,
        borderRadius: "24px",
        padding: "24px",
        border: `4px solid ${member.color}`
      }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: member.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
            margin: "0 auto 12px"
          }}>
            {member.photo}
          </div>
          <h2 style={{ margin: 0, fontSize: "28px", color: "#333" }}>
            {member.nickname}
          </h2>
          <p style={{ margin: "4px 0", color: "#666", fontSize: "16px" }}>
            {member.name}
          </p>
        </div>
        
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "20px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 12px", color: member.color, fontSize: "18px" }}>
            📅 Birthday
          </h3>
          <p style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>
            {formatBirthday(member.birthday)}
          </p>
        </div>
        
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "20px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 16px", color: member.color, fontSize: "18px" }}>
            🎂 Ages
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#E8F5E9",
              borderRadius: "12px"
            }}>
              <span style={{ fontWeight: "500" }}>When joined XOMG POP</span>
              <span style={{ 
                fontWeight: "700", 
                background: "#4CAF50",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px"
              }}>
                {ageAtJoin} years old
              </span>
            </div>
            
            {ageAtLeft && (
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 16px",
                background: "#FCE4EC",
                borderRadius: "12px"
              }}>
                <span style={{ fontWeight: "500" }}>When left XOMG POP</span>
                <span style={{ 
                  fontWeight: "700", 
                  background: "#E91E63",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px"
                }}>
                  {ageAtLeft} years old
                </span>
              </div>
            )}
            
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 16px",
              background: "#FFF3E0",
              borderRadius: "12px"
            }}>
              <span style={{ fontWeight: "700" }}>Age RIGHT NOW</span>
              <span style={{ 
                fontWeight: "700", 
                background: "#FF9800",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "16px"
              }}>
                {ageNow} years old
              </span>
            </div>
          </div>
        </div>
        
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "20px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 12px", color: member.color, fontSize: "18px" }}>
            📍 From
          </h3>
          <p style={{ margin: 0, fontSize: "18px" }}>{member.from}</p>
        </div>
        
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "20px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 12px", color: member.color, fontSize: "18px" }}>
            🎤 Role
          </h3>
          <p style={{ margin: 0, fontSize: "18px" }}>{member.role}</p>
        </div>
        
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "20px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 12px", color: member.color, fontSize: "18px" }}>
            ✨ Fun Fact
          </h3>
          <p style={{ margin: 0, fontSize: "18px" }}>{member.fun}</p>
        </div>
        
        <div style={{ 
          background: "white", 
          borderRadius: "16px", 
          padding: "20px",
          marginBottom: "16px"
        }}>
          <h3 style={{ margin: "0 0 12px", color: member.color, fontSize: "18px" }}>
            🌟 What are they doing now?
          </h3>
          <p style={{ margin: 0, fontSize: "18px" }}>{member.current}</p>
        </div>
        
        <div style={{ 
          background: member.color,
          borderRadius: "16px", 
          padding: "16px 20px",
          textAlign: "center"
        }}>
          <p style={{ margin: 0, fontSize: "16px", color: "white", fontWeight: "600" }}>
            📸 Instagram: {member.instagram}
          </p>
        </div>
      </div>
    </div>
  );
}

function SongsPage() {
  const [selectedSong, setSelectedSong] = useState(null);
  
  if (selectedSong) {
    const songMembers = MEMBERS.filter(m => selectedSong.members.includes(m.id));
    
    return (
      <div>
        <button
          onClick={() => setSelectedSong(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "#FF69B4",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            marginBottom: "20px"
          }}
        >
          ← Back to Songs
        </button>
        
        <div style={{
          background: "linear-gradient(135deg, #FF69B4, #FF1493)",
          borderRadius: "24px",
          padding: "24px",
          color: "white",
          marginBottom: "20px"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎵</div>
          <h2 style={{ margin: "0 0 8px", fontSize: "28px" }}>{selectedSong.title}</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "16px" }}>
            {selectedSong.type} • Released {formatDate(selectedSong.released)}
          </p>
          <p style={{ margin: "12px 0 0", fontSize: "18px" }}>
            {selectedSong.note}
          </p>
        </div>
        
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <h3 style={{ margin: "0 0 16px", color: "#FF69B4", fontSize: "20px" }}>
            👥 Who sang this song?
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {songMembers.map(m => (
              <div key={m.id} style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                background: `${m.color}20`,
                borderRadius: "20px",
                border: `2px solid ${m.color}`
              }}>
                <span>{m.photo}</span>
                <span style={{ fontWeight: "600" }}>{m.nickname}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          background: "#FFF9C4",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px"
        }}>
          <h3 style={{ margin: "0 0 16px", color: "#F57F17", fontSize: "20px" }}>
            🎂 Ages when song released
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {songMembers.map(m => (
              <div key={m.id} style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 16px",
                background: "white",
                borderRadius: "10px"
              }}>
                <span style={{ fontWeight: "500" }}>{m.photo} {m.nickname}</span>
                <span style={{
                  fontWeight: "700",
                  background: m.color,
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px"
                }}>
                  {calcAge(m.birthday, selectedSong.released)} years old
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{
          background: "#E1F5FE",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h3 style={{ margin: "0 0 16px", color: "#0288D1", fontSize: "20px" }}>
            👨‍👩‍👧 Our Family's Ages
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FAMILY.map(f => (
              <AgeBox 
                key={f.name}
                name={f.name}
                emoji={f.emoji}
                age={calcAge(f.birthday, selectedSong.released)}
                highlight={f.name === "Sienna"}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 style={{ color: "#FF69B4", marginBottom: "8px", fontSize: "24px" }}>
        🎵 All Songs
      </h2>
      <p style={{ color: "#666", marginBottom: "16px", fontSize: "16px" }}>
        Tap a song to see ages!
      </p>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {SONGS.map((song, i) => (
          <button
            key={i}
            onClick={() => setSelectedSong(song)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "16px",
              background: song.type === "Album" ? "linear-gradient(135deg, #FFD700, #FFA500)" : "white",
              border: song.type === "Album" ? "none" : "3px solid #FF69B4",
              borderRadius: "16px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "12px",
              background: song.type === "Album" ? "white" : "#FF69B4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px"
            }}>
              {song.type === "Album" ? "💿" : "🎵"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                fontWeight: "700", 
                fontSize: "17px", 
                color: song.type === "Album" ? "white" : "#333" 
              }}>
                {song.title}
              </div>
              <div style={{ 
                color: song.type === "Album" ? "rgba(255,255,255,0.9)" : "#666", 
                fontSize: "14px" 
              }}>
                {formatDate(song.released)}
              </div>
            </div>
            <div style={{ 
              fontSize: "24px", 
              color: song.type === "Album" ? "white" : "#CCC" 
            }}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TimelinePage() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  if (selectedEvent) {
    return (
      <div>
        <button
          onClick={() => setSelectedEvent(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            background: "#FF69B4",
            color: "white",
            border: "none",
            borderRadius: "30px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "16px",
            marginBottom: "20px"
          }}
        >
          ← Back to Timeline
        </button>
        
        <div style={{
          background: "linear-gradient(135deg, #9B59B6, #8E44AD)",
          borderRadius: "24px",
          padding: "24px",
          color: "white",
          marginBottom: "20px"
        }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>{selectedEvent.icon}</div>
          <h2 style={{ margin: "0 0 8px", fontSize: "24px" }}>{selectedEvent.event}</h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: "18px" }}>
            {formatDate(selectedEvent.date)}
          </p>
          <p style={{ margin: "12px 0 0", fontSize: "16px" }}>
            {selectedEvent.desc}
          </p>
        </div>
        
        <div style={{
          background: "#E1F5FE",
          borderRadius: "16px",
          padding: "20px"
        }}>
          <h3 style={{ margin: "0 0 16px", color: "#0288D1", fontSize: "20px" }}>
            👨‍👩‍👧 Our Family's Ages
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {FAMILY.map(f => (
              <AgeBox 
                key={f.name}
                name={f.name}
                emoji={f.emoji}
                age={calcAge(f.birthday, selectedEvent.date)}
                highlight={f.name === "Sienna"}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 style={{ color: "#9B59B6", marginBottom: "8px", fontSize: "24px" }}>
        📅 Timeline
      </h2>
      <p style={{ color: "#666", marginBottom: "16px", fontSize: "16px" }}>
        Tap an event to see ages!
      </p>
      
      <div style={{ position: "relative", paddingLeft: "32px" }}>
        <div style={{
          position: "absolute",
          left: "10px",
          top: "0",
          bottom: "0",
          width: "4px",
          background: "linear-gradient(180deg, #FF69B4, #9B59B6)",
          borderRadius: "2px"
        }} />
        
        {TIMELINE.map((t, i) => (
          <button
            key={i}
            onClick={() => setSelectedEvent(t)}
            style={{
              display: "block",
              width: "100%",
              padding: "16px",
              marginBottom: "12px",
              background: "white",
              border: t.event.includes("🎉") || t.event.includes("Born") 
                ? "3px solid #FFD700" 
                : t.event.includes("😢") || t.event.includes("💔")
                ? "3px solid #E0E0E0"
                : "3px solid #FF69B4",
              borderRadius: "16px",
              cursor: "pointer",
              textAlign: "left",
              position: "relative"
            }}
          >
            <div style={{
              position: "absolute",
              left: "-30px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "20px",
              height: "20px",
              background: t.event.includes("😢") || t.event.includes("💔") ? "#9B59B6" : "#FF69B4",
              borderRadius: "50%",
              border: "3px solid white"
            }} />
            
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "28px" }}>{t.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "700", fontSize: "16px", color: "#333" }}>
                  {t.event}
                </div>
                <div style={{ color: "#666", fontSize: "14px" }}>
                  {formatDate(t.date)}
                </div>
              </div>
              <div style={{ fontSize: "20px", color: "#CCC" }}>→</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AgesPage() {
  const today = new Date();
  
  return (
    <div>
      <h2 style={{ color: "#FF69B4", marginBottom: "20px", fontSize: "24px" }}>
        🎂 Everyone's Age Today
      </h2>
      
      <div style={{
        background: "linear-gradient(135deg, #FFE4EC, #FFF0F5)",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "24px",
        border: "3px solid #FF69B4"
      }}>
        <h3 style={{ margin: "0 0 16px", color: "#FF69B4", fontSize: "20px" }}>
          👨‍👩‍👧 Our Family
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {FAMILY.map(f => (
            <div key={f.name} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "14px 18px",
              background: "white",
              borderRadius: "14px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}>
              <span style={{ fontSize: "28px" }}>{f.emoji}</span>
              <span style={{ flex: 1, fontWeight: "600", fontSize: "18px" }}>{f.name}</span>
              <span style={{
                background: "#FF69B4",
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontWeight: "700",
                fontSize: "16px"
              }}>
                {calcAge(f.birthday)} years old
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
        background: "#F5F5F5",
        borderRadius: "20px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <h3 style={{ margin: "0 0 16px", color: "#9B59B6", fontSize: "20px" }}>
          🎤 XOMG POP Members
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {MEMBERS.sort((a, b) => new Date(a.birthday) - new Date(b.birthday)).map(m => (
            <div key={m.id} style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              background: "white",
              borderRadius: "12px",
              opacity: m.left ? 0.7 : 1
            }}>
              <span style={{ fontSize: "24px" }}>{m.photo}</span>
              <span style={{ flex: 1, fontWeight: "500", fontSize: "16px" }}>
                {m.nickname}
                {m.left && <span style={{ color: "#999", fontSize: "12px" }}> (left)</span>}
              </span>
              <span style={{
                background: m.left ? "#DDD" : m.color,
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontWeight: "600",
                fontSize: "14px"
              }}>
                {calcAge(m.birthday)}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{
        background: "#E8F5E9",
        borderRadius: "20px",
        padding: "20px"
      }}>
        <h3 style={{ margin: "0 0 12px", color: "#2E7D32", fontSize: "20px" }}>
          🌟 Fun Fact!
        </h3>
        <p style={{ margin: 0, fontSize: "16px", lineHeight: 1.6 }}>
          <strong>Sienna</strong> is the same age as <strong>Brooklynn</strong> (both born in 2010)! 
          She's also close in age to <strong>Kinley</strong> and <strong>Dallas</strong>!
        </p>
      </div>
    </div>
  );
}

// ============ MAIN APP ============

export default function XOMGPopExplorer() {
  const [page, setPage] = useState("members");
  const [selectedMember, setSelectedMember] = useState(null);
  
  const renderPage = () => {
    if (selectedMember) {
      return <MemberDetail member={selectedMember} onBack={() => setSelectedMember(null)} />;
    }
    
    switch (page) {
      case "members":
        return <MembersPage onSelectMember={setSelectedMember} />;
      case "songs":
        return <SongsPage />;
      case "timeline":
        return <TimelinePage />;
      case "ages":
        return <AgesPage />;
      default:
        return <MembersPage onSelectMember={setSelectedMember} />;
    }
  };
  
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #FFF0F5 0%, #FFF 100%)",
      fontFamily: "'Nunito', 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #FF69B4, #FF1493)",
        padding: "20px",
        textAlign: "center",
        color: "white",
        boxShadow: "0 4px 20px rgba(255,105,180,0.3)"
      }}>
        <h1 style={{ 
          margin: "0 0 4px", 
          fontSize: "28px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
        }}>
          ✨ XOMG POP Explorer ✨
        </h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
          For Sienna 💕
        </p>
      </div>
      
      {/* Navigation */}
      <div style={{
        display: "flex",
        gap: "8px",
        padding: "16px",
        background: "white",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
      }}>
        <NavButton 
          label="Members" 
          icon="👧" 
          active={page === "members"} 
          onClick={() => { setPage("members"); setSelectedMember(null); }} 
        />
        <NavButton 
          label="Songs" 
          icon="🎵" 
          active={page === "songs"} 
          onClick={() => setPage("songs")} 
        />
        <NavButton 
          label="Timeline" 
          icon="📅" 
          active={page === "timeline"} 
          onClick={() => setPage("timeline")} 
        />
        <NavButton 
          label="Ages" 
          icon="🎂" 
          active={page === "ages"} 
          onClick={() => setPage("ages")} 
        />
      </div>
      
      {/* Content */}
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        {renderPage()}
      </div>
      
      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "20px",
        color: "#999",
        fontSize: "12px"
      }}>
        Made with 💕 for Sienna
      </div>
    </div>
  );
}
