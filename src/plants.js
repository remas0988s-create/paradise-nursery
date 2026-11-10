const images = import.meta.glob('./assets/plant-*.svg', { eager:true, query:'?url', import:'default' });
export const categories = [
 {id:'leafy',name:'Leafy Houseplants',kicker:'A FRESH PERSPECTIVE',description:'Lush leaves and beautiful shapes for your indoor jungle.'},
 {id:'aromatic',name:'Aromatic Plants',kicker:'FOLLOW YOUR SENSES',description:'Fragrant favorites to brighten your windowsill.'},
 {id:'succulents',name:'Succulents & Cacti',kicker:'SMALL BUT FULL OF CHARACTER',description:'Sculptural little companions with an easy-going spirit.'}
];
const rows=[
 ['monstera','Monstera',25,'leafy','Bright, indirect light','Bold split leaves for a beautiful statement.'],
 ['snake','Snake Plant',18,'leafy','Easy care','Upright sculptural leaves for a quiet green corner.'],
 ['pothos','Golden Pothos',15,'leafy','Easy care','Golden-green trailing leaves with a playful spirit.'],
 ['peace','Peace Lily',22,'leafy','Indirect light','Glossy foliage and elegant creamy-white flowers.'],
 ['rubber','Rubber Plant',28,'leafy','Bright, indirect light','Deep green leaves with a striking glossy finish.'],
 ['fern','Boston Fern',20,'leafy','Loves humidity','Soft arching fronds for a lush, leafy feeling.'],
 ['lavender','Lavender',16,'aromatic','Sunny spot','Purple flower spikes with a familiar floral scent.'],
 ['rosemary','Rosemary',14,'aromatic','Sunny spot','Needle-like foliage with a warm herbal fragrance.'],
 ['mint','Mint',10,'aromatic','Regular watering','Fresh scented leaves for a cheerful kitchen garden.'],
 ['basil','Sweet Basil',12,'aromatic','Sunny spot','Tender green leaves with a sweet herbal aroma.'],
 ['jasmine','Jasmine',24,'aromatic','Bright light','A flowering climber with delicate white blossoms.'],
 ['lemon','Lemon Balm',13,'aromatic','Part sun','Textured leaves with a gentle lemony fragrance.'],
 ['aloe','Aloe Vera',17,'succulents','Water sparingly','A rosette of fleshy leaves with a graphic silhouette.'],
 ['echeveria','Echeveria',11,'succulents','Sunny spot','A compact blue-green rosette in perfect symmetry.'],
 ['jade','Jade Plant',19,'succulents','Easy care','Plump oval leaves on a miniature tree-like plant.'],
 ['zebra','Zebra Haworthia',12,'succulents','Indirect light','Striped pointed leaves with plenty of personality.'],
 ['barrel','Golden Barrel Cactus',21,'succulents','Sunny spot','A round ribbed cactus with a halo of golden spines.'],
 ['burro','Burro’s Tail',15,'succulents','Bright light','Cascading stems packed with blue-green leaves.']
];
export const plants=rows.map(([id,name,price,category,care,description],i)=>({id,name,price,category,care,description,image:images[`./assets/plant-${i+1}.svg`]}));
