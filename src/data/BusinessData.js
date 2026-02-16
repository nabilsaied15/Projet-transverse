export const categories = [
    { id: 'all', name: 'Tous', icon: '🏪' },
    { id: 'bakery', name: 'Boulangerie', icon: '🥖' },
    { id: 'florist', name: 'Fleuriste', icon: '🌻' },
    { id: 'bookstore', name: 'Librairie', icon: '📚' },
    { id: 'fashion', name: 'Mode', icon: '👕' },
    { id: 'grocery', name: 'Alimentation', icon: '🍒' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
    { id: 'crafts', name: 'Artisanat', icon: '🎨' }
];

export const businesses = [
    {
        id: 1,
        name: "La Baguette Dorée",
        category: "bakery",
        rating: 4.8,
        reviews: 124,
        address: "12 Rue des Artisans, 75001 Paris",
        phone: "01 42 33 45 67",
        email: "contact@baguettedoree.fr",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
        description: "Artisan boulanger passionné depuis 1985. Nous utilisons uniquement des farines locales et bios.",
        reviews_list: [
            { id: 1, user: "Alice", rating: 5, comment: "Le pain est incroyable, surtout la tradition !" },
            { id: 2, user: "Bob", rating: 4, comment: "Très bonne boulangerie, mais un peu d'attente le matin." },
            { id: 3, user: "Claire", rating: 5, comment: "Les croissants au beurre sont à tomber par terre." }
        ],
        products: [
            { id: 101, name: "Tradition", price: 1.20, image: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?auto=format&fit=crop&w=400&q=80" },
            { id: 102, name: "Croissant au beurre", price: 1.10, image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80" },
            { id: 103, name: "Pain au Chocolat", price: 1.30, image: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 2,
        name: "L'Atelier des Fleurs",
        category: "florist",
        rating: 4.9,
        reviews: 89,
        address: "5 Avenue de la République, 75011 Paris",
        phone: "01 48 05 12 34",
        email: "bonjour@atelierfleurs.com",
        image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
        description: "Compositions florales uniques pour tous vos événements. Fleurs de saison et locales.",
        reviews_list: [
            { id: 1, user: "Julie", rating: 5, comment: "Bouquets magnifiques et fleurs très fraîches." },
            { id: 2, user: "Marc", rating: 5, comment: "Accueil chaleureux et conseils d'experts." }
        ],
        products: [
            { id: 201, name: "Bouquet Champêtre", price: 25.00, image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=400&q=80" },
            { id: 202, name: "Roses Rouges (x12)", price: 35.00, image: "https://images.unsplash.com/photo-1548625342-999337482387?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 3,
        name: "Le Vieux Grimoire",
        category: "bookstore",
        rating: 4.7,
        reviews: 210,
        address: "8 Rue de la Huchette, 75005 Paris",
        phone: "01 43 25 67 89",
        email: "info@levieuxgrimoire.fr",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80",
        description: "Librairie indépendante spécialisée dans les ouvrages anciens et la littérature classique.",
        reviews_list: [
            { id: 1, user: "Thomas", rating: 4, comment: "Une véritable caverne d'Ali Baba pour les amoureux des livres." },
            { id: 2, user: "Sophie", rating: 5, comment: "On y trouve des pépites introuvables ailleurs." }
        ],
        products: [
            { id: 301, name: "Les Misérables - Édition Luxe", price: 45.00, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80" },
            { id: 302, name: "Agenda des Curieux", price: 15.00, image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 4,
        name: "Mode Éthique",
        category: "fashion",
        rating: 4.6,
        reviews: 56,
        address: "22 Rue de Rivoli, 75004 Paris",
        phone: "01 42 77 88 99",
        email: "contact@modeethique.fr",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
        description: "Vêtements éco-responsables et accessoires fabriqués en France.",
        reviews_list: [
            { id: 1, user: "Léa", rating: 5, comment: "Enfin de la mode qui a du sens !" }
        ],
        products: [
            { id: 401, name: "T-shirt Coton Bio", price: 29.00, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80" },
            { id: 402, name: "Sac en toile recyclée", price: 19.00, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 5,
        name: "Le Bistrot du Marché",
        category: "restaurant",
        rating: 4.5,
        reviews: 342,
        address: "45 Rue de Bretagne, 75003 Paris",
        phone: "01 42 72 34 56",
        email: "reservation@bistrotdumarche.fr",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        description: "Cuisine traditionnelle française avec des produits frais du marché des Enfants Rouges.",
        reviews_list: [
            { id: 1, user: "Nicolas", rating: 5, comment: "Une cuisine simple mais délicieuse, comme à la maison." },
            { id: 2, user: "Emma", rating: 4, comment: "Ambiance très sympa, un peu bruyant le midi." }
        ],
        products: [
            { id: 501, name: "Plat du Jour", price: 14.50, image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80" },
            { id: 502, name: "Mousse au Chocolat", price: 6.00, image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 6,
        name: "L'Épicerie Fine",
        category: "grocery",
        rating: 4.9,
        reviews: 156,
        address: "10 Rue des Martyrs, 75009 Paris",
        phone: "01 48 78 12 34",
        email: "contact@lepiceriefine.com",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
        description: "Produits du terroir, fromages affinés et charcuterie artisanale.",
        reviews_list: [
            { id: 1, user: "Antoine", rating: 5, comment: "Sélection de produits exceptionnelle." }
        ],
        products: [
            { id: 601, name: "Comté 24 mois (250g)", price: 8.50, image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=400&q=80" },
            { id: 602, name: "Huile d'Olive Bio", price: 12.00, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 7,
        name: "Poterie & Co",
        category: "crafts",
        rating: 4.8,
        reviews: 45,
        address: "18 Rue Saint-Paul, 75004 Paris",
        phone: "01 42 71 56 78",
        email: "atelier@poterieco.fr",
        image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&w=800&q=80",
        description: "Objets de décoration en céramique faits main dans notre atelier parisien.",
        reviews_list: [
            { id: 1, user: "Chloe", rating: 5, comment: "Magnifique travail, les pièces sont uniques." }
        ],
        products: [
            { id: 701, name: "Vase artisanal", price: 35.00, image: "https://images.unsplash.com/photo-1578500484748-48526824f0fd?auto=format&fit=crop&w=400&q=80" },
            { id: 702, name: "Tasse à café", price: 18.00, image: "https://images.unsplash.com/photo-1514218953589-2d7d37efd2dd?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 8,
        name: "La Petite Italie",
        category: "restaurant",
        rating: 4.7,
        reviews: 289,
        address: "7 Rue de la Gaité, 75014 Paris",
        phone: "01 43 20 98 76",
        email: "ciao@lapetiteitalie.com",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
        description: "Les meilleures pizzas napolitaines au feu de bois du quartier.",
        reviews_list: [
            { id: 1, user: "Luigi", rating: 5, comment: "La pâte est parfaite, comme à Naples." }
        ],
        products: [
            { id: 801, name: "Pizza Margherita", price: 13.00, image: "https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=400&q=80" },
            { id: 802, name: "Tiramisu Maison", price: 7.50, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 9,
        name: "Bulles et Plumes",
        category: "bookstore",
        rating: 4.9,
        reviews: 78,
        address: "2 Rue Dante, 75005 Paris",
        phone: "01 43 26 54 32",
        email: "BD@bullesplumes.fr",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
        description: "Librairie spécialisée en bandes dessinées, comics et mangas.",
        reviews_list: [
            { id: 1, user: "Kevin", rating: 5, comment: "Large choix et bons conseils." }
        ],
        products: [
            { id: 901, name: "Tome 1 - Nouvelle Série", price: 14.99, image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 10,
        name: "Fripe & Chic",
        category: "fashion",
        rating: 4.4,
        reviews: 112,
        address: "56 Rue de Turenne, 75003 Paris",
        phone: "01 42 74 33 22",
        email: "hello@fripechic.fr",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
        description: "Dépôt-vente de luxe et vintage. Pièces uniques sélectionnées avec soin.",
        reviews_list: [
            { id: 1, user: "Manon", rating: 4, comment: "Beaux articles mais prix un peu élevés." }
        ],
        products: [
            { id: 1001, name: "Veste Vintage 70s", price: 85.00, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 11,
        name: "Le Pain des Amis",
        category: "bakery",
        rating: 4.7,
        reviews: 198,
        address: "34 Rue Yves Toudic, 75010 Paris",
        phone: "01 42 40 44 55",
        email: "pain@amis.fr",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80",
        description: "Boulangerie emblématique connue pour son 'Pain des Amis' cuit au four à bois.",
        reviews_list: [
            { id: 1, user: "Paul", rating: 5, comment: "Le pain est une tuerie." }
        ],
        products: [
            { id: 1101, name: "Pavé du Coin", price: 4.50, image: "https://images.unsplash.com/photo-1586444248902-2f64eddf13cf?auto=format&fit=crop&w=400&q=80" }
        ]
    },
    {
        id: 12,
        name: "Nuance Verte",
        category: "florist",
        rating: 4.8,
        reviews: 42,
        address: "123 Rue de Charenton, 75012 Paris",
        phone: "01 43 45 66 77",
        email: "contact@nuanceverte.fr",
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
        description: "Plantes d'intérieur rares et conseils en végétalisation.",
        reviews_list: [
            { id: 1, user: "Inès", rating: 5, comment: "Très bon accueil et conseils précieux pour mes plantes." }
        ],
        products: [
            { id: 1201, name: "Monstera Deliciosa", price: 25.00, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80" }
        ]
    }
];
