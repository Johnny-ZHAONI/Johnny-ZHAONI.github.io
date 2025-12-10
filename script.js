const { useState, useEffect } = React;

// --- 故事节点数据 ---
const storyNodes = {
    "start": {
        id: "start",
        title: "The Ancient City",
        subtitle: "Beijing Backdrop",
        text: [
            "Beijing — \"filthy, beautiful, decadent, bustling, chaotic, idle, lovable\" — is important as a backdrop for the book.",
            "\"The only friend he had was this ancient city.\""
        ],
        image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800", 
        choices: [
            { text: "Introduce the Hero", target: "hero_intro" }
        ]
    },
    "hero_intro": {
        id: "hero_intro",
        title: "The Choice",
        subtitle: "Servant or Independent?",
        text: [
            "The major subject matter of Rickshaw Boy is the way in which the hero makes his living pulling a rickshaw.",
            "He faces fundamental issues: whether to work independently or as a servant to a family, and whether to rent or own a rickshaw."
        ],
        image: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=800",
        choices: [
            { text: "Examine the Machine", target: "machine" },
            { text: "Face the Economics", target: "economics" }
        ]
    },
    "machine": {
        id: "machine",
        title: "Man and Machine",
        subtitle: "A Physical Bond",
        text: [
            "The book explores the intimate relationship between man and machine (the rickshaw), and the evolution of that relationship.",
            "\"His strength seemed to permeate every part of the rickshaw... he was energetic, smooth in his motions, precise. He didn't appear to be in any hurry and yet he ran very fast...\""
        ],
        image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800",
        choices: [
            { text: "The Cost of Labor", target: "struggle" }
        ]
    },
    "economics": {
        id: "economics",
        title: "The Struggle",
        subtitle: "Precarious Existence",
        text: [
            "As Xiangzi pulls a rickshaw, the author says that \"A man with his physique, his ability to endure so much, and his determination should not be treated like a pig or a dog.\"",
            "No matter how hard you work or how ambitious you are, you must not start a family, you must not get sick, and you must not make a single mistake!"
        ],
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?auto=format&fit=crop&w=800",
        choices: [
            { text: "The Reality of Aging", target: "struggle" }
        ]
    },
    "struggle": {
        id: "struggle",
        title: "Survival",
        subtitle: "Naturalism & Cruelty",
        text: [
            "If you avoid dying of starvation when young, good for you. But it was almost impossible to avoid dying of starvation when old.",
            "The novel profoundly satirizes the cruelty of Chinese society. Xiangzi was born into poverty, leading him to believe that the hard work and honesty of his youth were a waste."
        ],
        image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800",
        choices: [
            { text: "The Final Outcome", target: "isolation" }
        ]
    },
    "isolation": {
        id: "isolation",
        title: "Isolation",
        subtitle: "Individualism",
        text: [
            "\"His life might well be ruined by his own hands but he wasn't about to sacrifice anything for anybody.\"",
            "\"He who works for himself knows how to destroy himself.\"",
            "These are the two starting points of Individualism."
        ],
        image: "https://images.unsplash.com/photo-1439902315629-cd882022cea0?auto=format&fit=crop&w=800",
        choices: [
            { text: "Return to the City", target: "start" }
        ]
    }
};

const App = () => {
    const [view, setView] = useState('landing');
    const [currentNodeId, setCurrentNodeId] = useState('start');
    const [loopCount, setLoopCount] = useState(0);
    const [fadeKey, setFadeKey] = useState(0);
    const [imageError, setImageError] = useState(false);

    // 处理"不感兴趣"的循环逻辑
    const handleNo = () => {
        setView('looping');
        setLoopCount(prev => prev + 1);
        setTimeout(() => {
            setView('landing');
        }, 500);
    };

    // 处理"感兴趣"逻辑
    const handleYes = () => {
        setView('story');
        setCurrentNodeId('start');
        setImageError(false);
        setFadeKey(Date.now());
    };

    // 页面导航逻辑
    const navigateTo = (targetId) => {
        setCurrentNodeId(targetId);
        setImageError(false);
        setFadeKey(Date.now());
        window.scrollTo(0, 0);
    };

    const currentNode = storyNodes[currentNodeId];

    // 渲染落地页 (Landing Page)
    if (view === 'landing' || view === 'looping') {
        if (view === 'looping') {
            return <div className="h-screen w-full bg-black flex items-center justify-center"></div>;
        }

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-gray-200 p-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gray-800 opacity-20 pointer-events-none"></div>
                
                <div className="max-w-2xl w-full text-center z-10 fade-in">
                    <p className="text-gray-500 text-sm tracking-[0.3em] uppercase mb-4">Lao She</p>
                    <h1 className="text-6xl md:text-8xl mb-2 text-white serif-font tracking-tight">
                        Rickshaw Boy
                    </h1>
                    <h2 className="text-3xl md:text-4xl text-gray-600 serif-font mb-12">
                        骆驼祥子
                    </h2>
                    
                    <div className="space-y-8 mt-16 border-t border-gray-800 pt-16">
                        <p className="text-xl md:text-2xl font-light italic text-gray-400 mb-8">
                            "The only friend he had was this ancient city."
                        </p>
                        <p className="text-lg uppercase tracking-widest mb-8">
                            {loopCount > 0 ? (
                                <span className="text-gray-500">Fate is cyclical. Are you interested?</span>
                            ) : (
                                "Are you interested in this story?"
                            )}
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <button onClick={handleYes} className="group relative px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-all duration-300 w-48 overflow-hidden">
                                <span className="relative z-10">Yes</span>
                            </button>
                            <button onClick={handleNo} className="px-8 py-3 border border-gray-700 text-gray-500 font-bold uppercase tracking-widest hover:border-gray-500 hover:text-gray-300 transition-all duration-300 w-48">
                                No
                            </button>
                        </div>
                    </div>
                </div>
                <footer className="absolute bottom-8 text-gray-800 text-xs">© 2025 Project Rickshaw</footer>
            </div>
        );
    }

    // 渲染故事页 (Story Page)
    return (
        <div className="min-h-screen bg-black text-gray-300 flex flex-col justify-between">
            <nav className="w-full bg-black/80 backdrop-blur-sm border-b border-gray-900 z-40 px-6 py-4 flex justify-between items-center fixed top-0">
                <div className="text-white serif-font text-xl tracking-wider">骆驼祥子</div>
                <button onClick={() => setView('landing')} className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                    Exit Story
                </button>
            </nav>

            <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-12">
                <div key={fadeKey} className="max-w-4xl w-full fade-enter-active">
                    <header className="mb-12 border-l-2 border-white pl-6">
                        <h3 className="text-gray-500 text-sm uppercase tracking-[0.2em] mb-2">
                            {currentNode.subtitle}
                        </h3>
                        <h1 className="text-4xl md:text-6xl text-white serif-font">
                            {currentNode.title}
                        </h1>
                    </header>

                    {currentNode.image && (
                        <div className="mb-10 w-full h-64 md:h-80 overflow-hidden relative">
                            {!imageError ? (
                                <img 
                                    src={currentNode.image} 
                                    alt={currentNode.title} 
                                    className="image-grayscale"
                                    onError={() => setImageError(true)}
                                />
                            ) : (
                                <div className="image-placeholder">
                                    IMAGE UNAVAILABLE
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
                        </div>
                    )}

                    <div className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed mb-16 max-w-2xl">
                        {currentNode.text.map((paragraph, index) => (
                            <p key={index} className="mb-6">{paragraph}</p>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 border-t border-gray-800 pt-12">
                        {currentNode.choices.map((choice, index) => (
                            <button 
                                key={index}
                                onClick={() => navigateTo(choice.target)}
                                className="group text-left p-6 border border-gray-800 hover:border-white hover:bg-white/5 transition-all duration-300"
                            >
                                <span className="block text-xs text-gray-600 mb-2 uppercase tracking-widest group-hover:text-white">
                                    Path {index + 1}
                                </span>
                                <span className="text-xl serif-font text-gray-300 group-hover:text-white group-hover:translate-x-2 transition-transform inline-block">
                                    {choice.text} →
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <footer className="text-center py-6 text-gray-800 text-xs uppercase tracking-widest">
                Hypertext Fiction Project
            </footer>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
