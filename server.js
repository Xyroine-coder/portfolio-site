const express = require('express');
const app = express();
const PORT = 3000;

// Static files
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Bible verses
const bibleVerses = [
    { reference: 'John 3:16', text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
    { reference: 'Philippians 4:13', text: 'I can do all things through Christ who strengthens me.' },
    { reference: 'Psalm 23:1', text: 'The Lord is my shepherd; I shall not want.' },
    { reference: 'Proverbs 3:5-6', text: 'Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.' },
    { reference: 'Romans 8:28', text: 'And we know that in all things God works for the good of those who love him, who have been called according to his purpose.' },
    { reference: 'Jeremiah 29:11', text: 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.' },
    { reference: 'Isaiah 41:10', text: 'So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.' },
    { reference: 'Matthew 11:28', text: 'Come to me, all you who are weary and burdened, and I will give you rest.' },
    { reference: 'Psalm 46:1', text: 'God is our refuge and strength, an ever-present help in trouble.' },
    { reference: '1 Corinthians 13:4-7', text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.' },
    { reference: 'Ephesians 2:8-9', text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.' },
    { reference: 'Romans 12:2', text: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God’s will is—his good, pleasing and perfect will.' },
    { reference: 'Psalm 37:4', text: 'Take delight in the Lord, and he will give you the desires of your heart.' },
    { reference: 'Hebrews 11:1', text: 'Now faith is confidence in what we hope for and assurance about what we do not see.' },
    { reference: 'Matthew 6:33', text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.' },
    { reference: 'Joshua 1:9', text: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.' },
    { reference: '1 Peter 5:7', text: 'Cast all your anxiety on him because he cares for you.' },
    { reference: 'John 14:6', text: 'Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.”' },
    { reference: 'Psalm 119:105', text: 'Your word is a lamp to my feet and a light for my path.' },
    { reference: 'Galatians 5:22-23', text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.' },
    { reference: '2 Timothy 1:7', text: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.' },
    { reference: 'Romans 10:9', text: 'If you declare with your mouth, “Jesus is Lord,” and believe in your heart that God raised him from the dead, you will be saved.' },
    { reference: 'Psalm 34:18', text: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' },
    { reference: 'Deuteronomy 31:6', text: 'Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.' },
    { reference: 'Matthew 5:16', text: 'Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.' },
    { reference: 'Colossians 3:23', text: 'Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.' },
    { reference: 'Psalm 27:1', text: 'The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?' },
    { reference: '1 John 4:18', text: 'There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.' },
    { reference: 'Isaiah 40:31', text: 'But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.' },
    { reference: 'Psalm 121:1-2', text: 'I lift up my eyes to the mountains—where does my help come from? My help comes from the Lord, the Maker of heaven and earth.' },
    { reference: 'John 8:12', text: 'When Jesus spoke again to the people, he said, “I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.”' },
    { reference: 'Romans 5:8', text: 'But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.' },
    { reference: 'Proverbs 16:3', text: 'Commit to the Lord whatever you do, and he will establish your plans.' },
    { reference: 'Psalm 55:22', text: 'Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.' },
    { reference: 'Matthew 7:7', text: 'Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.' },
    { reference: 'Hebrews 13:5', text: 'Keep your lives free from the love of money and be content with what you have, because God has said, “Never will I leave you; never will I forsake you.”' },
    { reference: 'Isaiah 26:3', text: 'You will keep in perfect peace those whose minds are steadfast, because they trust in you.' },
    { reference: 'James 1:5', text: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.' },
    { reference: 'Psalm 91:1-2', text: 'Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty. I will say of the Lord, “He is my refuge and my fortress, my God, in whom I trust.”' },
    { reference: 'Romans 15:13', text: 'May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.' },
    { reference: '1 Thessalonians 5:16-18', text: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.' },
    { reference: 'Micah 6:8', text: 'He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.' },
    { reference: 'Psalm 103:2-4', text: 'Praise the Lord, my soul, and forget not all his benefits—who forgives all your sins and heals all your diseases, who redeems your life from the pit and crowns you with love and compassion.' },
    { reference: '2 Corinthians 5:7', text: 'For we live by faith, not by sight.' },
    { reference: 'John 15:12', text: 'My command is this: Love each other as I have loved you.' },
    { reference: 'Proverbs 4:23', text: 'Above all else, guard your heart, for everything you do flows from it.' },
    { reference: 'Psalm 37:5', text: 'Commit your way to the Lord; trust in him and he will do this.' },
    { reference: 'Isaiah 43:2', text: 'When you pass through the waters, I will be with you; and when you pass through the rivers, they will not sweep over you. When you walk through the fire, you will not be burned; the flames will not set you ablaze.' },
    { reference: 'Philippians 1:6', text: 'Being confident of this, that he who began a good work in you will carry it on to completion until the day of Christ Jesus.' },
    { reference: 'Psalm 16:8', text: 'I keep my eyes always on the Lord. With him at my right hand, I will not be shaken.' },
    { reference: 'Matthew 28:20', text: 'And surely I am with you always, to the very end of the age.' },
    { reference: '1 John 1:9', text: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.' },
];


// Get daily verse
function getDailyVerse() {
    const today = new Date();
    const dayIndex = today.getDate() % bibleVerses.length;
    return bibleVerses[dayIndex];
}

app.get('/', (req, res) => {
    const dailyVerse = getDailyVerse();

    res.render('index', {
        name: 'Captured',
        about: 'Hi! I’m Captured, a passionate young developer from the USA. Over the past four years, I’ve immersed myself in coding, building projects and experimenting with Python, Java, C++, and more. I love creating clean, efficient solutions and learning new technologies every day. When I’m not coding, I enjoy exploring innovative ideas and sharing my knowledge with others. I’m always excited to take on new challenges and grow as a developer.',
        links: [
            { name: 'Gunslol', url: 'https://guns.lol/captured', icon: 'fa-solid fa-gun', tooltip: 'Check out my Gunslol profile!' },
            { name: 'Discord', url: 'https://discord.gg/pxVCDhagnd', icon: 'fa-brands fa-discord', tooltip: 'Join my Discord server!' },
            { name: 'YouTube', url: 'https://www.youtube.com/@CapturedIsHim', icon: 'fa-brands fa-youtube', tooltip: 'Watch my projects & tutorials!' },
            { name: 'BuyMeACoffee', url: 'https://www.buymeacoffee.com/xyroine', icon: 'fa-solid fa-mug-hot', tooltip: 'Support me on Buy Me a Coffee!' }
        ],
        skills: [
            { name: 'Python', level: 90 },
            { name: 'Java', level: 80 },
            { name: 'C++', level: 70 },
            { name: 'JavaScript', level: 85 },
            { name: 'Roblox Lua', level: 80 }
        ],
        bibleVerse: dailyVerse
    });
});

app.listen(PORT, () => console.log(`Portfolio running at http://localhost:${PORT}`));
