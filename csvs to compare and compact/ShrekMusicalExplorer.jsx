import React, { useState } from 'react';
import { Star, Home, Heart, Film } from 'lucide-react';

// ===== DATA SECTION =====
// All production and people data is here at the top!

const productionsData = [
  {
    id: 1,
    year: 2008,
    month: 8,
    city: 'Seattle',
    state: 'WA',
    country: 'USA',
    theater: '5th Avenue Theatre',
    shrek: 'Brian d\'Arcy James',
    fiona: 'Sutton Foster',
    donkey: 'Chester Gregory II',
    farquaad: 'Christopher Sieber',
    teenFiona: '',
    youngFiona: '',
    special: false,
    youtubeLink: '',
    siennaAttended: false
  },
  {
    id: 2,
    year: 2008,
    month: 12,
    city: 'New York City',
    state: 'NY',
    country: 'USA',
    theater: 'Broadway Theatre',
    shrek: 'Brian d\'Arcy James',
    fiona: 'Sutton Foster',
    donkey: 'Daniel Breaker',
    farquaad: 'Christopher Sieber',
    teenFiona: 'Tessa Albertson',
    youngFiona: 'Rozi Baker',
    special: false,
    youtubeLink: 'https://www.youtube.com/results?search_query=shrek+broadway+2008',
    siennaAttended: false
  },
  {
    id: 3,
    year: 2009,
    month: 11,
    city: 'New York City',
    state: 'NY',
    country: 'USA',
    theater: 'Broadway Theatre',
    shrek: 'Ben Crawford',
    fiona: 'Sutton Foster',
    donkey: 'Daniel Breaker',
    farquaad: 'Christopher Sieber',
    teenFiona: '',
    youngFiona: '',
    special: false,
    youtubeLink: '',
    siennaAttended: false
  },
  {
    id: 4,
    year: 2010,
    month: 7,
    city: 'Chicago (US Tour)',
    state: 'IL',
    country: 'USA',
    theater: 'Various Theaters',
    shrek: 'Eric Petersen',
    fiona: 'Haven Burton',
    donkey: 'Alan Mingo Jr.',
    farquaad: 'David F.M. Vaughn',
    teenFiona: '',
    youngFiona: '',
    special: false,
    youtubeLink: '',
    siennaAttended: false
  },
  {
    id: 5,
    year: 2011,
    month: 6,
    city: 'London',
    state: '',
    country: 'UK',
    theater: 'Theatre Royal Drury Lane',
    shrek: 'Nigel Lindsay',
    fiona: 'Amanda Holden',
    donkey: 'Richard Blackwood',
    farquaad: 'Nigel Harman',
    teenFiona: '',
    youngFiona: '',
    special: false,
    youtubeLink: '',
    siennaAttended: false
  },
  {
    id: 6,
    year: 2011,
    month: 9,
    city: 'Madrid',
    state: '',
    country: 'Spain',
    theater: 'Teatro Nuevo Apolo',
    shrek: 'Enrique Sequero',
    fiona: 'Mirela Cabero',
    donkey: 'Héctor Fernández',
    farquaad: 'Jaume Ortanobas',
    teenFiona: '',
    youngFiona: '',
    special: false,
    youtubeLink: '',
    siennaAttended: false
  },
  {
    id: 7,
    year: 2020,
    month: 1,
    city: 'Sydney',
    state: '',
    country: 'Australia',
    theater: 'Sydney Lyric Theatre',
    shrek: 'Ben Mingay',
    fiona: 'Lucy Durack',
    donkey: 'Nat Jobe',
    farquaad: 'Todd McKenney',
    teenFiona: '',
    youngFiona: '',
    special: false,
    youtubeLink: '',
    siennaAttended: false
  },
  {
    id: 8,
    year: 2024,
    month: 9,
    city: 'West Palm Beach',
    state: 'FL',
    country: 'USA',
    theater: 'Kravis Center',
    shrek: 'Nicholas Hambruch',
    fiona: 'Kelly Prendergast',
    donkey: 'Naphtali Yaakov Curry',
    farquaad: 'Timmy Lewis',
    teenFiona: 'Lauryn Hobbs',
    youngFiona: 'Evie Dolan',
    special: true,
    youtubeLink: '',
    siennaAttended: true
  },
  {
    id: 9,
    year: 2025,
    month: 10,
    city: 'Coral Gables',
    state: 'FL',
    country: 'USA',
    theater: 'Miracle Theater (Actors\' Playhouse)',
    shrek: 'Julio Cesar Esquivel',
    fiona: 'Anneliese Wolfanger',
    donkey: 'Cam Davis',
    farquaad: 'Elijah Rey',
    teenFiona: 'Chloe Anello',
    youngFiona: 'Vivi Franco',
    special: true,
    youtubeLink: '',
    siennaAttended: true
  },
  {
    id: 10,
    year: 2025,
    month: 12,
    city: 'Coral Gables',
    state: 'FL',
    country: 'USA',
    theater: 'Actors\' Playhouse',
    shrek: '',
    fiona: '',
    donkey: '',
    farquaad: '',
    teenFiona: '',
    youngFiona: '',
    special: true,
    youtubeLink: '',
    siennaAttended: false,
    note: 'Sienna watching (not performing)'
  }
];

const peopleData = [
  { id: 1, name: 'Sienna', birthday: '2010-11-24', relationship: 'Me!' },
  { id: 2, name: 'Daddy Neil', birthday: '1973-06-07', relationship: 'Family' },
  { id: 3, name: 'Mommy Cheryl', birthday: '1975-04-21', relationship: 'Family' }
];

// Shrek Movies & Specials Data
const shrekMoviesData = [
  { 
    id: 1, 
    type: 'Movie', 
    number: 1, 
    title: 'Shrek', 
    year: 2001, 
    releaseDate: '2001-05-18', 
    shortDesc: 'Shrek rescues Princess Fiona from a dragon',
    fullDesc: 'When grumpy ogre Shrek finds his swamp invaded by fairy tale creatures banished by evil Lord Farquaad, he makes a deal: rescue Princess Fiona from a dragon-guarded tower, and Farquaad will give him his swamp back. With his new friend Donkey, Shrek completes the quest, but along the way he and Fiona fall in love. Fiona has a secret - she\'s under a curse that makes her an ogress at night. On their wedding day, true love\'s kiss breaks the spell, and Fiona stays an ogress permanently, marrying Shrek.',
    characters: ['Shrek', 'Princess Fiona', 'Donkey', 'Lord Farquaad', 'Dragon', 'Young Fiona']
  },
  { id: 2, type: 'Short', title: 'Shrek in the Swamp Karaoke Dance Party', year: 2001, releaseDate: '2001-11-02', shortDesc: 'Musical short on Shrek DVD', fullDesc: 'A fun musical party with all the Shrek characters singing modern pop songs.', characters: [] },
  { id: 3, type: 'Short', title: 'Shrek 4-D', year: 2003, releaseDate: '2003-05-24', shortDesc: 'Theme park ride turned short film', fullDesc: 'Lord Farquaad\'s ghost kidnaps Fiona on her honeymoon, and Shrek and Donkey must rescue her again!', characters: [] },
  { 
    id: 4, 
    type: 'Movie', 
    number: 2, 
    title: 'Shrek 2', 
    year: 2004, 
    releaseDate: '2004-05-19', 
    shortDesc: 'Shrek and Fiona visit Far Far Away',
    fullDesc: 'Newlyweds Shrek and Fiona travel to the kingdom of Far Far Away to meet her parents, the King and Queen. They\'re shocked to discover their daughter married an ogre! The scheming Fairy Godmother and Prince Charming plot to break up Shrek and Fiona. The King hires a bounty hunter named Puss in Boots to kill Shrek, but Puss becomes friends with Shrek instead. Using a magic potion, Shrek becomes human temporarily, but ultimately he and Fiona choose to stay as ogres and live happily ever after.',
    characters: ['Shrek', 'Princess Fiona', 'Donkey', 'Puss in Boots (first appears!)', 'King Harold', 'Queen Lillian', 'Prince Charming', 'Fairy Godmother']
  },
  { id: 5, type: 'Short', title: 'Far Far Away Idol', year: 2004, releaseDate: '2004-11-05', shortDesc: 'American Idol parody with Shrek characters', fullDesc: 'A singing competition featuring Shrek characters, with Simon Cowell as a judge!', characters: [] },
  { 
    id: 6, 
    type: 'Movie', 
    number: 3, 
    title: 'Shrek the Third', 
    year: 2007, 
    releaseDate: '2007-05-18', 
    shortDesc: 'Shrek finds an heir to the throne',
    fullDesc: 'When Fiona\'s father King Harold dies, Shrek is next in line to become king of Far Far Away. Not wanting to be king, Shrek sets out with Donkey and Puss in Boots to find the rightful heir - Fiona\'s teenage cousin Arthur (Artie). Meanwhile, Fiona discovers she\'s pregnant with ogre triplets! Prince Charming leads an army of fairy tale villains to take over the kingdom. Shrek returns just in time, and with Artie\'s help, defeats Charming. Artie becomes the new king, and Shrek returns home to become a father.',
    characters: ['Shrek', 'Princess Fiona', 'Donkey', 'Puss in Boots', 'Arthur (Artie)', 'Prince Charming', 'Merlin']
  },
  { id: 7, type: 'Special', title: 'Shrek the Halls', year: 2007, releaseDate: '2007-11-28', shortDesc: 'Christmas special - Shrek celebrates his first Christmas', fullDesc: 'It\'s Shrek\'s first Christmas! He doesn\'t know anything about the holiday because ogres don\'t celebrate. Donkey has been bugging him for months to get ready. Shrek rushes to town and buys "Christmas for Village Idiots" to learn how to celebrate. He decorates the swamp and gets a tree for a quiet family Christmas, but Donkey invites ALL their friends over, ruining Shrek\'s plans. Everyone tells their own versions of "The Night Before Christmas" - Donkey tells about a waffle Santa, Puss tells about Santa Claus (with a cat twist), and Gingy tells a scary story about Santa eating his girlfriend! A fight breaks out and Shrek loses his temper, kicking everyone out. After apologizing, they all come back and Shrek tells his own story about "Ogre Claus." Then real Santa shows up and puts ogre ears on the moon!', characters: ['Shrek', 'Fiona', 'Ogre babies', 'Donkey', 'Puss in Boots', 'Gingy'], songs: ['Jingle Bells', 'The Twelve Days of Christmas', 'Deck the Halls', 'Santa Claus is Comin\' to Town', 'Don\'t Stop Believin\'', 'Summer Breeze'] },
  { 
    id: 8, 
    type: 'Movie', 
    number: 4, 
    title: 'Shrek Forever After', 
    year: 2010, 
    releaseDate: '2010-05-21', 
    shortDesc: 'Shrek makes a deal with Rumpelstiltskin',
    fullDesc: 'Shrek feels overwhelmed by family life and longs for the days when he was a "real ogre." He makes a deal with the trickster Rumpelstiltskin - trading one day from his past for one day as a scary ogre again. But Rumpelstiltskin tricks him and takes the day Shrek was born, creating an alternate reality where Shrek never existed! In this world, Rumpelstiltskin rules, ogres are hunted, and Fiona doesn\'t know who Shrek is. Shrek must make Fiona fall in love with him by midnight to break the contract, or he\'ll disappear forever. With Donkey\'s help, Shrek wins Fiona\'s love and returns to his real family.',
    characters: ['Shrek', 'Princess Fiona', 'Donkey', 'Puss in Boots', 'Rumpelstiltskin', 'Ogre babies (triplets)']
  },
  { id: 9, type: 'Special', title: 'Scared Shrekless', year: 2010, releaseDate: '2010-10-28', shortDesc: 'Halloween special - scary story contest', fullDesc: 'Halloween is Shrek\'s favorite holiday! After scaring trick-or-treaters with his kids, Shrek challenges his friends to a scary story contest. They go to the abandoned castle of Lord Farquaad in Duloc. Whoever can tell the scariest story wins and becomes "King of Halloween!" Gingy tells "The Bride of Gingy" (like Bride of Frankenstein) about making a girlfriend with too much sugar. Donkey and Puss tell "Boots Motel" (like the movie Psycho). Shrek tells "The Shreksorcist" (like The Exorcist) about babysitting a possessed Pinocchio who spins his head and vomits! At the end, Fiona and the babies dress up as Lord Farquaad\'s ghost to scare Donkey, making Shrek the winner!', characters: ['Shrek', 'Fiona', 'Donkey', 'Puss in Boots', 'Gingy', 'Pinocchio', 'Ogre babies'], stories: ['The Bride of Gingy (parody of Bride of Frankenstein)', 'Boots Motel (parody of Psycho)', 'The Shreksorcist (parody of The Exorcist)'] },
  { id: 12, type: 'Short', title: 'The Pig Who Cried Werewolf', year: 2011, releaseDate: '2011-10-04', shortDesc: 'Three Little Pigs Halloween short', fullDesc: 'The Three Little Pigs discover their new neighbor is a werewolf!', characters: [] },
  { id: 13, type: 'Short', title: 'Thriller Night', year: 2011, releaseDate: '2011-09-13', shortDesc: 'Shrek characters dance to Thriller', fullDesc: 'Shrek and friends perform a fun dance to Michael Jackson\'s Thriller!', characters: [] },
  { id: 14, type: 'Special', title: "Donkey's Caroling Christmas-tacular", year: 2010, releaseDate: '2010-12-07', shortDesc: 'Donkey sings Christmas carols', fullDesc: 'Donkey brings all the Shrek characters together for a Christmas sing-along! Everyone sings fun, silly versions of classic Christmas songs. The ogres sing about bug cocoons and cricket slurp. Puss sings "Fleas Navidad" instead of "Feliz Navidad!" It\'s a short, fun musical celebration with all your favorite characters.', characters: ['Donkey', 'Puss in Boots', 'Shrek', 'Fiona', 'Ogre babies'], songs: ['It\'s the Most Wonderful Time (sung by Donkey)', 'Jingle Bells - ogre version (Bug Cocoon, Lick the Spoon)', 'Fleas Navidad (Puss sings Feliz Navidad)', 'Fairy Tale Rock (Jingle Bell Rock)'] },
  { 
    id: 16, 
    type: 'Movie', 
    number: 5, 
    title: 'Shrek 5', 
    year: 2027, 
    releaseDate: '2027-06-30', 
    shortDesc: 'Shrek returns for new adventures!',
    fullDesc: 'Details coming soon! Mike Myers, Eddie Murphy, and Cameron Diaz are all returning. The movie will feature Shrek and Fiona\'s daughter Felicia (voiced by Zendaya)!',
    upcoming: true,
    characters: ['Shrek', 'Princess Fiona', 'Donkey', 'Puss in Boots', 'Felicia (their daughter - new!)']
  }
];

// Puss in Boots Movies (separate from main Shrek)
const pussInBootsMoviesData = [
  { 
    id: 10, 
    type: 'Movie', 
    title: 'Puss in Boots', 
    year: 2011, 
    releaseDate: '2011-10-28', 
    shortDesc: 'Puss in Boots origin story',
    fullDesc: 'Before he met Shrek, Puss in Boots was a hero! This movie tells how young Puss grew up with his friend Humpty Dumpty. They search for magic beans to find the goose that lays golden eggs. Puss meets a clever cat thief named Kitty Softpaws, and together they go on an exciting adventure. Puss learns about friendship, betrayal, and becomes the legendary hero we know.',
    characters: ['Puss in Boots', 'Kitty Softpaws', 'Humpty Dumpty']
  },
  { id: 11, type: 'Short', title: 'Puss in Boots: The Three Diablos', year: 2012, releaseDate: '2012-02-24', shortDesc: 'Puss helps three kittens', fullDesc: 'Puss must rescue a princess\'s ruby with the help of three troublesome little kittens called The Three Diablos!', characters: ['Puss in Boots'] },
  { 
    id: 15, 
    type: 'Movie', 
    title: 'Puss in Boots: The Last Wish', 
    year: 2022, 
    releaseDate: '2022-12-21', 
    shortDesc: 'Puss seeks the Wishing Star',
    fullDesc: 'Puss in Boots discovers he\'s used up 8 of his 9 lives and decides to retire. But when he learns about a magical Wishing Star that can restore his lost lives, he comes out of retirement for one last adventure. He reunites with Kitty Softpaws and meets a new friend, a therapy dog named Perrito. Together they race against Goldilocks, the Three Bears, and Big Jack Horner to find the star. Puss learns that the life he has left is precious and worth living fully. At the end, they sail toward Far Far Away to visit old friends (Shrek and Donkey)!',
    characters: ['Puss in Boots', 'Kitty Softpaws', 'Perrito', 'Goldilocks', 'Big Jack Horner', 'Shrek & Donkey (cameo)']
  }
];

// ===== APP COMPONENT =====

const ShrekMusicalExplorer = () => {
  const [people, setPeople] = useState(peopleData);
  const [productions, setProductions] = useState(productionsData);
  const [favorites, setFavorites] = useState({
    theaters: [],
    actors: [],
    productions: []
  });
  const [selectedProduction, setSelectedProduction] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [shrekMovies] = useState(shrekMoviesData);
  const [pussInBootsMovies] = useState(pussInBootsMoviesData);
  const [expandedMovies, setExpandedMovies] = useState({});

  // Calculate age with months
  const calculateAge = (birthday, productionYear, productionMonth = 1) => {
    const birthDate = new Date(birthday);
    const productionDate = new Date(productionYear, productionMonth - 1, 1);
    
    let years = productionDate.getFullYear() - birthDate.getFullYear();
    let months = productionDate.getMonth() - birthDate.getMonth();
    
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Before birth
    if (years < 0) {
      return `Not born yet (${Math.abs(years)} year${Math.abs(years) !== 1 ? 's' : ''} before Sienna)`;
    }
    
    // Baby (under 1 year)
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''} old`;
    }
    
    // Exactly X years
    if (months === 0) {
      return `${years} year${years !== 1 ? 's' : ''} old`;
    }
    
    // X years and Y months
    return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''} old`;
  };

  // Toggle favorite
  const toggleFavorite = (type, item) => {
    setFavorites(prev => {
      const key = type === 'production' ? 'productions' : 
                   type === 'theater' ? 'theaters' : 'actors';
      const current = prev[key];
      const exists = current.includes(item);
      
      return {
        ...prev,
        [key]: exists 
          ? current.filter(i => i !== item)
          : [...current, item]
      };
    });
  };

  const isFavorite = (type, item) => {
    const key = type === 'production' ? 'productions' : 
                 type === 'theater' ? 'theaters' : 'actors';
    return favorites[key].includes(item);
  };

  // Production Card Component
  const ProductionCard = ({ production }) => (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h2 style={{ 
            color: '#8B9D83', 
            fontSize: '2rem', 
            margin: '0 0 0.5rem 0',
            fontWeight: '600'
          }}>
            {production.year}
          </h2>
          <p style={{ color: '#6B5D52', fontSize: '1.2rem', margin: '0' }}>
            {production.city}{production.state ? `, ${production.state}` : ''}, {production.country}
          </p>
        </div>
        <button
          onClick={() => toggleFavorite('production', production.id)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <Star 
            size={24} 
            fill={isFavorite('production', production.id) ? '#E8A87C' : 'none'}
            stroke="#E8A87C"
          />
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '1rem 0',
        padding: '1rem',
        background: '#F5F1E8',
        borderRadius: '8px'
      }}>
        <span style={{ fontSize: '1.1rem', color: '#6B5D52', flex: 1 }}>
          🎭 {production.theater}
        </span>
        <button
          onClick={() => toggleFavorite('theater', production.theater)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          <Star 
            size={18} 
            fill={isFavorite('theater', production.theater) ? '#E8A87C' : 'none'}
            stroke="#E8A87C"
          />
        </button>
      </div>

      <div style={{
        background: '#E8F5E9',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h3 style={{ color: '#8B9D83', margin: '0 0 0.75rem 0', fontSize: '1.1rem' }}>
          Ages at this show:
        </h3>
        {people.map(person => (
          <p key={person.id} style={{ color: '#6B5D52', margin: '0.25rem 0' }}>
            {person.name}: {calculateAge(person.birthday, production.year, production.month)}
          </p>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3 style={{ color: '#8B9D83', margin: '0 0 1rem 0', fontSize: '1.2rem' }}>Cast:</h3>
        {[
          { emoji: '🟢', role: 'Shrek', actor: production.shrek },
          { emoji: '👸', role: 'Princess Fiona', actor: production.fiona },
          { emoji: '🐴', role: 'Donkey', actor: production.donkey },
          { emoji: '👑', role: 'Lord Farquaad', actor: production.farquaad }
        ].map(({ emoji, role, actor }) => actor && (
          <div key={role} style={{
            background: '#F5F1E8',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.1rem', color: '#6B5D52' }}>
              {emoji} <strong>{role}:</strong> {actor}
            </span>
            <button
              onClick={() => toggleFavorite('actors', actor)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem'
              }}
            >
              <Star 
                size={18} 
                fill={isFavorite('actors', actor) ? '#E8A87C' : 'none'}
                stroke="#E8A87C"
              />
            </button>
          </div>
        ))}
        
        {(production.teenFiona || production.youngFiona) && (
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ color: '#8B9D83', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>
              Young Fionas:
            </h4>
            {production.teenFiona && (
              <div style={{
                background: '#F5F1E8',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.1rem', color: '#6B5D52' }}>
                  👧 <strong>Teen Fiona:</strong> {production.teenFiona}
                </span>
                <button
                  onClick={() => toggleFavorite('actors', production.teenFiona)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  <Star 
                    size={18} 
                    fill={isFavorite('actors', production.teenFiona) ? '#E8A87C' : 'none'}
                    stroke="#E8A87C"
                  />
                </button>
              </div>
            )}
            {production.youngFiona && (
              <div style={{
                background: '#F5F1E8',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.1rem', color: '#6B5D52' }}>
                  👶 <strong>Young Fiona:</strong> {production.youngFiona}
                </span>
                <button
                  onClick={() => toggleFavorite('actors', production.youngFiona)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem'
                  }}
                >
                  <Star 
                    size={18} 
                    fill={isFavorite('actors', production.youngFiona) ? '#E8A87C' : 'none'}
                    stroke="#E8A87C"
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {production.youtubeLink && (
        <a 
          href={production.youtubeLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#E57373',
            color: 'white',
            textAlign: 'center',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          📺 Watch on YouTube
        </a>
      )}
    </div>
  );

  // Home View
  const HomeView = () => {
    const siennaShows = productions.filter(p => p.siennaAttended);
    const otherShows = productions.filter(p => !p.siennaAttended);

    return (
      <div style={{ padding: '1rem' }}>
        <h1 style={{ 
          color: '#8B9D83', 
          textAlign: 'center', 
          margin: '0 0 1.5rem 0',
          fontSize: '2rem'
        }}>
          🟢 Shrek the Musical 🎭
        </h1>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{
            display: 'block',
            color: '#6B5D52',
            fontWeight: '600',
            marginBottom: '0.5rem',
            fontSize: '1.1rem'
          }}>
            Choose a show:
          </label>
          <select
            value={selectedProduction?.id || ''}
            onChange={(e) => {
              const prod = productions.find(p => p.id === parseInt(e.target.value));
              setSelectedProduction(prod);
            }}
            style={{
              width: '100%',
              padding: '1.5rem',
              minHeight: '60px',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: '2px solid #8B9D83',
              background: 'white',
              color: '#6B5D52',
              cursor: 'pointer'
            }}
          >
            <option value="">-- Select a Production --</option>
            {siennaShows.length > 0 && (
              <optgroup label="⭐ Sienna's Shows">
                {siennaShows.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.year} - {p.city}, {p.country}
                  </option>
                ))}
              </optgroup>
            )}
            <optgroup label="Other Productions">
              {otherShows.map(p => (
                <option key={p.id} value={p.id}>
                  {p.year} - {p.city}, {p.country}
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        {selectedProduction && <ProductionCard production={selectedProduction} />}
      </div>
    );
  };

  // Favorites View
  const FavoritesView = () => (
    <div style={{ padding: '1rem' }}>
      <h1 style={{ color: '#8B9D83', margin: '0 0 1.5rem 0' }}>My Favorites ⭐</h1>
      
      {favorites.productions.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#8B9D83', fontSize: '1.3rem', marginBottom: '1rem' }}>
            Favorite Productions:
          </h2>
          {productions
            .filter(p => favorites.productions.includes(p.id))
            .map(p => (
              <div key={p.id} style={{
                background: 'white',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '0.5rem'
              }}>
                {p.year} - {p.city}, {p.country}
              </div>
            ))}
        </div>
      )}

      {favorites.theaters.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#8B9D83', fontSize: '1.3rem', marginBottom: '1rem' }}>
            Favorite Theaters:
          </h2>
          {favorites.theaters.map(theater => (
            <div key={theater} style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              🎭 {theater}
            </div>
          ))}
        </div>
      )}

      {favorites.actors.length > 0 && (
        <div>
          <h2 style={{ color: '#8B9D83', fontSize: '1.3rem', marginBottom: '1rem' }}>
            Favorite Actors:
          </h2>
          {favorites.actors.map(actor => (
            <div key={actor} style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '0.5rem'
            }}>
              ⭐ {actor}
            </div>
          ))}
        </div>
      )}

      {favorites.productions.length === 0 && 
       favorites.theaters.length === 0 && 
       favorites.actors.length === 0 && (
        <p style={{ color: '#6B5D52', textAlign: 'center', marginTop: '2rem' }}>
          No favorites yet! Tap the ⭐ stars to add favorites.
        </p>
      )}
    </div>
  );

  // Movies View
  const MoviesView = () => {
    // Calculate countdown to Shrek 5 in multiple units
    const shrek5Date = new Date('2027-06-30');
    const today = new Date();
    const daysUntil = Math.ceil((shrek5Date - today) / (1000 * 60 * 60 * 24));
    const weeksUntil = Math.floor(daysUntil / 7);
    const monthsUntil = Math.floor(daysUntil / 30.44); // Average month
    const yearsUntil = Math.floor(daysUntil / 365.25); // Account for leap years

    const movies = shrekMovies.filter(m => m.type === 'Movie');
    const specials = shrekMovies.filter(m => m.type === 'Special');
    const shorts = shrekMovies.filter(m => m.type === 'Short');
    const pussMov = pussInBootsMovies.filter(m => m.type === 'Movie');
    const pussShorts = pussInBootsMovies.filter(m => m.type === 'Short');

    const toggleExpand = (movieId) => {
      setExpandedMovies(prev => ({
        ...prev,
        [movieId]: !prev[movieId]
      }));
    };

    return (
      <div style={{ padding: '1rem' }}>
        <h1 style={{ color: '#8B9D83', textAlign: 'center', margin: '0 0 1.5rem 0' }}>
          🎬 Shrek Movies & Specials 🟢
        </h1>

        {/* Main Shrek Movies */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#8B9D83', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Shrek Movies:
          </h2>
          {movies.map(movie => (
            <div key={movie.id} style={{
              background: movie.upcoming ? '#FFF3E0' : 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: movie.upcoming ? '3px solid #E8A87C' : 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    color: '#8B9D83', 
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.3rem',
                    fontWeight: '600'
                  }}>
                    {movie.number}. {movie.title}
                  </h3>
                  <p style={{ color: '#6B5D52', margin: '0.25rem 0', fontSize: '1.1rem' }}>
                    📅 {movie.year}
                  </p>
                  
                  {/* Short description */}
                  <p style={{ color: '#6B5D52', margin: '0.5rem 0' }}>
                    {movie.shortDesc}
                  </p>

                  {/* Expandable full description */}
                  {movie.fullDesc && (
                    <>
                      {expandedMovies[movie.id] && (
                        <p style={{ 
                          color: '#6B5D52', 
                          margin: '0.75rem 0',
                          padding: '0.75rem',
                          background: '#F5F1E8',
                          borderRadius: '8px',
                          fontSize: '0.95rem'
                        }}>
                          {movie.fullDesc}
                        </p>
                      )}
                      <button
                        onClick={() => toggleExpand(movie.id)}
                        style={{
                          background: '#8B9D83',
                          color: 'white',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          marginTop: '0.5rem',
                          fontSize: '0.9rem'
                        }}
                      >
                        {expandedMovies[movie.id] ? 'Show Less' : 'Read Full Story'}
                      </button>
                    </>
                  )}

                  {/* Characters */}
                  {movie.characters && movie.characters.length > 0 && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '0.75rem',
                      background: '#E8F5E9',
                      borderRadius: '8px'
                    }}>
                      <strong style={{ color: '#8B9D83' }}>Characters: </strong>
                      <span style={{ color: '#6B5D52' }}>{movie.characters.join(', ')}</span>
                    </div>
                  )}
                  
                  {/* Countdown for Shrek 5 */}
                  {movie.upcoming && (
                    <div style={{
                      background: '#E8A87C',
                      color: 'white',
                      padding: '1rem',
                      borderRadius: '8px',
                      marginTop: '1rem'
                    }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.75rem', textAlign: 'center' }}>
                        ⏰ Countdown to Shrek 5:
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.95rem' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{daysUntil}</div>
                          <div>days</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{weeksUntil}</div>
                          <div>weeks</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{monthsUntil}</div>
                          <div>months</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{yearsUntil}</div>
                          <div>years</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Sienna's age box */}
              <div style={{
                background: '#E8F5E9',
                padding: '0.75rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <p style={{ color: '#6B5D52', margin: '0', fontSize: '0.9rem' }}>
                  Sienna: {calculateAge('2010-11-24', movie.year, 6)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Puss in Boots Movies */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#8B9D83', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Puss in Boots Movies:
          </h2>
          {pussMov.map(movie => (
            <div key={movie.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#8B9D83', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                {movie.title}
              </h3>
              <p style={{ color: '#6B5D52', margin: '0.25rem 0' }}>
                📅 {movie.year}
              </p>
              
              <p style={{ color: '#6B5D52', margin: '0.5rem 0' }}>
                {movie.shortDesc}
              </p>

              {movie.fullDesc && (
                <>
                  {expandedMovies[movie.id] && (
                    <p style={{ 
                      color: '#6B5D52', 
                      margin: '0.75rem 0',
                      padding: '0.75rem',
                      background: '#F5F1E8',
                      borderRadius: '8px',
                      fontSize: '0.95rem'
                    }}>
                      {movie.fullDesc}
                    </p>
                  )}
                  <button
                    onClick={() => toggleExpand(movie.id)}
                    style={{
                      background: '#8B9D83',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                      fontSize: '0.9rem'
                    }}
                  >
                    {expandedMovies[movie.id] ? 'Show Less' : 'Read Full Story'}
                  </button>
                </>
              )}

              {movie.characters && movie.characters.length > 0 && (
                <div style={{
                  marginTop: '1rem',
                  padding: '0.75rem',
                  background: '#E8F5E9',
                  borderRadius: '8px'
                }}>
                  <strong style={{ color: '#8B9D83' }}>Characters: </strong>
                  <span style={{ color: '#6B5D52' }}>{movie.characters.join(', ')}</span>
                </div>
              )}

              <div style={{
                background: '#E8F5E9',
                padding: '0.75rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <p style={{ color: '#6B5D52', margin: '0', fontSize: '0.9rem' }}>
                  Sienna: {calculateAge('2010-11-24', movie.year, 11)}
                </p>
              </div>
            </div>
          ))}
          {pussShorts.map(short => (
            <div key={short.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '0.75rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#8B9D83', margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>
                {short.title} ({short.year})
              </h3>
              <p style={{ color: '#6B5D52', margin: '0', fontSize: '0.95rem' }}>
                {short.shortDesc}
              </p>
            </div>
          ))}
        </div>

        {/* TV Specials */}
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ color: '#8B9D83', fontSize: '1.5rem', marginBottom: '1rem' }}>
            TV Specials:
          </h2>
          {specials.map(special => (
            <div key={special.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#8B9D83', margin: '0 0 0.5rem 0', fontSize: '1.2rem' }}>
                {special.title}
              </h3>
              <p style={{ color: '#6B5D52', margin: '0.25rem 0' }}>
                📅 {special.year}
              </p>
              <p style={{ color: '#6B5D52', margin: '0.5rem 0' }}>
                {special.shortDesc || special.fullDesc}
              </p>
              {special.characters && special.characters.length > 0 && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.75rem',
                  background: '#E8F5E9',
                  borderRadius: '8px'
                }}>
                  <strong style={{ color: '#8B9D83' }}>Characters: </strong>
                  <span style={{ color: '#6B5D52' }}>{special.characters.join(', ')}</span>
                </div>
              )}
              <div style={{
                background: '#E8F5E9',
                padding: '0.75rem',
                borderRadius: '8px',
                marginTop: '1rem'
              }}>
                <p style={{ color: '#6B5D52', margin: '0', fontSize: '0.9rem' }}>
                  Sienna: {calculateAge('2010-11-24', special.year, 11)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shorts */}
        <div>
          <h2 style={{ color: '#8B9D83', fontSize: '1.5rem', marginBottom: '1rem' }}>
            Short Films:
          </h2>
          {shorts.map(short => (
            <div key={short.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '1rem',
              marginBottom: '0.75rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#8B9D83', margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>
                {short.title} ({short.year})
              </h3>
              <p style={{ color: '#6B5D52', margin: '0', fontSize: '0.95rem' }}>
                {short.shortDesc || short.fullDesc}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #F5F1E8, #E8F5E9)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Top Navigation */}
      <div style={{
        background: '#8B9D83',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <button
          onClick={() => setCurrentView('home')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <Home size={24} />
        </button>
        <h1 style={{ color: 'white', margin: 0, fontSize: '1.3rem' }}>Shrek Musical</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setCurrentView('movies')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <Film size={24} />
          </button>
          <button
            onClick={() => setCurrentView('favorites')}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
          >
            <Heart size={24} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {currentView === 'home' && <HomeView />}
      {currentView === 'favorites' && <FavoritesView />}
      {currentView === 'movies' && <MoviesView />}
    </div>
  );
};

export default ShrekMusicalExplorer;
