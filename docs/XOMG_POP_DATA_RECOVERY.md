# XOMG POP Data Recovery & Expansion Plan

**Date:** January 29, 2026  
**Status:** Data needs to be restored to D1 database

---

## What Happened

The live app at siennasapp.com is pulling from D1 database, but some data from the original `xomgpop-explorer-v2.jsx` was lost during migration.

---

## Data to Restore

### Family (3 people)

| id | name | nickname | birthday | emoji | type |
|----|------|----------|----------|-------|------|
| sienna | Sienna | Sienna | 2010-11-24 | ⭐ | family |
| daddy | Daddy (Neil) | Daddy | 1973-06-07 | 👨 | family |
| mommy | Mommy (Cheryl) | Mommy | 1975-04-21 | 👩 | family |

### XOMG POP Members (8 people)

| id | name | nickname | birthday | from | role | current_status | left_date |
|----|------|----------|----------|------|------|----------------|-----------|
| kiya | Kiya Barczyszyn | Kiya | 2009-09-14 | Boise, Idaho | Dancer, Singer | Joined Kidz Bop 2023, left to help sick mom | 2022-11-01 |
| brooklynn | Brooklynn Pitts | Brooklynn | 2010-09-28 | Texas | Singer, Dancer | Still performing! Cast in Camp Rock 3! | null |
| leigha | Leigha Rose Sanderson | Leigha | 2007-04-20 | Dallas, Texas | Singer, Dancer, Ukulele | Dancing at Beyond Belief Dance Company | 2023-09-01 |
| dallas | Dallas Skye Gatson | Dallas | 2011-11-17 | Los Angeles | Singer, Dancer | Still performing! | null |
| kinley | Kinley Cunningham | Kinley Full Out | 2010-12-22 | Los Angeles | Dancer, Singer, Actress | Stars as Kombucha on Thundermans: Undercover! | 2023-11-01 |
| tinie | Tamara Andreasyan | Tinie T | 2011-03-13 | Van Nuys, CA | Rapper, Dancer | Still performing! | null |
| bella | Isabella Cianni Llerena | Bella | 2009-09-08 | Miami, Florida | Singer, Dancer | Dancing and pursuing dreams! | 2023-11-01 |
| penelope | Penelope Anne LeMieux | Penelope | 2013-07-12 | California | Dancer | Newest member! Still performing! | null |

### XOMG POP Fun Facts

- **Kiya:** Loves vintage records & guitar!
- **Brooklynn:** Loves BTS, Chipotle & giraffes!
- **Leigha:** Loves butterflies! Has Spina Bifida but never gives up!
- **Dallas:** Learning 5 languages! Plays piano & bass!
- **Kinley:** Favorite color is RAINBOW! Loves scary movies!
- **Tinie T:** Danced with Taylor Swift! Speaks Armenian!
- **Bella:** Cuban-American! Loves leopard print!
- **Penelope:** Was on AGT with Phil Wright! Sister Londyn dances too!

### Songs (5)

| id | title | released | type | note |
|----|-------|----------|------|------|
| candy-hearts | Candy Hearts | 2021-12-17 | Single | First song ever! Performed on Ellen! |
| secret-handshake | The Secret Handshake | 2022-04-15 | Single | Has a fun dance! |
| merry-go-round | Merry Go Round | 2022-08-01 | Single | Performed at AGT Semifinals! |
| 1234ever | 1234EVER | 2023-02-01 | Single | About friendship! |
| party-album | Party Like a Popstar (Album) | 2023-03-10 | Album | First album! 10 songs! 2 by Meghan Trainor! |

### Timeline Events (12)

| id | date | title | desc | icon |
|----|------|-------|------|------|
| show-starts | 2021-11-14 | TV Show Starts! | Siwas Dance Pop Revolution on Peacock | 📺 |
| band-formed | 2021-12-16 | XOMG POP is Born! | 6 girls chosen! Bella added later! | ⭐ |
| candy-release | 2021-12-17 | Candy Hearts Released! | First song ever! | 🍬 |
| ellen-show | 2021-12-22 | Ellen Show Performance! | First TV performance! | 📺 |
| dream-tour | 2022-01-15 | JoJo D.R.E.A.M. Tour! | XOMG POP opens for JoJo! | 🎤 |
| agt-audition | 2022-05-31 | AGT Audition! | They made it through! | 🌟 |
| agt-semi | 2022-08-23 | AGT Semifinals! | Performed Merry Go Round! | 🎡 |
| kiya-leaves | 2022-11-01 | Kiya Leaves | First member to leave | 👋 |
| mall-concert | 2023-02-18 | Mall of America Concert! | 3000+ fans came! | 🏬 |
| album-release | 2023-03-10 | Album Released! | Party Like a Popstar! | 💿 |
| leigha-leaves | 2023-09-01 | Leigha Leaves | Went back to dance school | 👋 |
| penelope-joins | 2023-10-01 | Penelope Joins! | New member from AGT! | 🌟 |

---

## Bigger Concept

Sienna's app will track **all** her favorites:

### Groups/Bands
- **XOMG POP** ✅ (data above)
- **Kidz Bop** (3 concerts attended!)
- **Spy Ninjas** (cast changes, spinoffs)

### YouTube Families
- Chad Wild Clay family
- Other family channels with spinoffs

### Shows
- **Shrek Musical** (Kravis 2024, Miracle Theater 2025)
- Other musicals

### Key Features Sienna Needs
1. **Ages at any date** - pick a date, see how old everyone was
2. **Timeline** - vertical scroll, mobile-friendly
3. **Favorites** - heart button for people, events, groups
4. **Connections** - who was in band when, voice actors, crossovers
5. **Concerts we attended** - special highlight

---

## SQL to Restore Data

```sql
-- People: Family
INSERT INTO people (id, name, nickname, birthday, emoji, type) VALUES
('sienna', 'Sienna', 'Sienna', '2010-11-24', '⭐', 'family'),
('daddy', 'Daddy (Neil)', 'Daddy', '1973-06-07', '👨', 'family'),
('mommy', 'Mommy (Cheryl)', 'Mommy', '1975-04-21', '👩', 'family');

-- People: XOMG POP Members
INSERT INTO people (id, name, nickname, birthday, emoji, type, notes) VALUES
('kiya', 'Kiya Barczyszyn', 'Kiya', '2009-09-14', '🎸', 'musician', 'Loves vintage records & guitar!'),
('brooklynn', 'Brooklynn Pitts', 'Brooklynn', '2010-09-28', '🦒', 'musician', 'Loves BTS, Chipotle & giraffes!'),
('leigha', 'Leigha Rose Sanderson', 'Leigha', '2007-04-20', '🦋', 'musician', 'Loves butterflies! Has Spina Bifida but never gives up!'),
('dallas', 'Dallas Skye Gatson', 'Dallas', '2011-11-17', '🎹', 'musician', 'Learning 5 languages! Plays piano & bass!'),
('kinley', 'Kinley Cunningham', 'Kinley Full Out', '2010-12-22', '🌈', 'musician', 'Favorite color is RAINBOW!'),
('tinie', 'Tamara Andreasyan', 'Tinie T', '2011-03-13', '🎤', 'musician', 'Danced with Taylor Swift! Speaks Armenian!'),
('bella', 'Isabella Cianni Llerena', 'Bella', '2009-09-08', '🐆', 'musician', 'Cuban-American! Loves leopard print!'),
('penelope', 'Penelope Anne LeMieux', 'Penelope', '2013-07-12', '💃', 'musician', 'Was on AGT with Phil Wright!');

-- Group
INSERT INTO groups (id, name, type, emoji) VALUES
('xomg-pop', 'XOMG POP', 'band', '🎤');

-- Events
INSERT INTO events (id, name, date, emoji, notes) VALUES
('xomg-formed', 'XOMG POP is Born!', '2021-12-16', '⭐', '6 girls chosen!'),
('ellen-show', 'Ellen Show Performance', '2021-12-22', '📺', 'First TV!'),
('agt-audition', 'AGT Audition', '2022-05-31', '🌟', 'They made it!'),
('agt-semi', 'AGT Semifinals', '2022-08-23', '🎡', 'Merry Go Round!');
```

---

## Next Steps

1. Run SQL to restore XOMG POP data to D1
2. Verify data shows on siennasapp.com
3. Add Kidz Bop concerts (2012, 2018)
4. Add Shrek Musical @ Kravis (2024-09-28)
5. Continue expanding with more of Sienna's favorites
