export interface Puzzle {
  id: number;
  title: string;
  era: string;
  timeline: 'Egyptian' | 'Midnight Carnival' | 'Protocol Zero' | 'Dark Souls' | 'Game of Thrones' | 'Resident Evil' | 'Alice in Borderland';
  answer: string;
  storyPrefix: string;
  hiddenClue: string;
  storySuffix: string;
  puzzleContent: string;
  codeBlock: string;
  steps: string[];
  hintLight: string;
  hintStrong: string;
  colorTheme: string;
  organizerType: 'binary-flipper' | 'matrix-outlier' | 'card-filter' | 'luhn-validator' | 'node-path' | 'rle-decoder' | 'hex-leak' | 'topo-sort' | 'load-balancer' | 'bridge-builder' | 'virus-grid' | 'captcha-align';
  organizerData: any;
}

export const puzzlesData: Puzzle[] = [
  {
    id: 1,
    title: 'Binary Hieroglyphs',
    era: 'Dynasty 0x1A - Giza',
    timeline: 'Egyptian',
    answer: 'OPEN',
    storyPrefix: 'The sand-swept entrance to the Pharaoh\'s vault is carved with ancient symbols. Touching the stone reveals a hidden, modern digital grid overlay. Underneath the dusty hieroglyphic inscriptions, you notice ',
    hiddenClue: 'each row corresponds to a single byte of binary. Convert them to ASCII to unlock.',
    storySuffix: ' The digital scarabs crawl over the glowing circuitry.',
    puzzleContent: 'Decrypt the binary hieroglyphs to find the word that grants entry to the tomb.',
    codeBlock: `Row 0: 01001111 (O)\nRow 1: 01010000 (P)\nRow 2: 01000101 (E)\nRow 3: 01001110 (N)`,
    steps: [
      'Analyze the binary grid on the sarcophagus.',
      'Convert each 8-bit row into its corresponding decimal character value.',
      'Combine the characters to form the passcode.',
    ],
    hintLight: 'The prefix 0100xxxx represents uppercase letters in ASCII.',
    hintStrong: '01001111 = 79 (O), 01010000 = 80 (P), 01000101 = 69 (E), 01001110 = 78 (N).',
    colorTheme: 'Egyptian',
    organizerType: 'binary-flipper',
    organizerData: {
      bytes: [
        { label: 'Byte 0', initial: [0,1,0,0,1,1,1,1], letter: 'O' },
        { label: 'Byte 1', initial: [0,1,0,1,0,0,0,0], letter: 'P' },
        { label: 'Byte 2', initial: [0,1,0,0,0,1,0,1], letter: 'E' },
        { label: 'Byte 3', initial: [0,1,0,0,1,1,1,0], letter: 'N' }
      ]
    }
  },
  {
    id: 2,
    title: 'Infinite Feed',
    era: 'The Grand Illusion - 1888',
    timeline: 'Midnight Carnival',
    answer: 'CLUE',
    storyPrefix: 'Inside the hall of mirrors, a floating steam-powered projector casts an endless, scrolling ticker. The text moves too fast to comprehend at first, but adjusting your focal glass reveals that ',
    hiddenClue: 'every third post in the stream holds a highlighted symbol. Stitch them together.',
    storySuffix: ' The mechanical calliope whistles as the steam rises.',
    puzzleContent: 'Filter the stream index by modulo-3 and extract the secret key.',
    codeBlock: `index[0]: 'A'  index[1]: 'X'  index[2]: 'C' [target]\nindex[3]: 'K'  index[4]: 'Y'  index[5]: 'L' [target]\nindex[6]: 'B'  index[7]: 'Q'  index[8]: 'U' [target]\nindex[9]: 'Z'  index[10]: 'J' index[11]: 'E' [target]`,
    steps: [
      'Locate the project logs or messages on the mirror panels.',
      'Extract characters situated precisely at indices divisible by 3 (starting at index 2).',
      'The letters will form the solution word.',
    ],
    hintLight: 'Look at indices 2, 5, 8, 11...',
    hintStrong: 'The characters at the key locations spell CLUE.',
    colorTheme: 'Midnight Carnival',
    organizerType: 'card-filter',
    organizerData: {
      items: [
        { index: 0, text: 'A - Noise' },
        { index: 1, text: 'X - Filler' },
        { index: 2, text: 'C - Decoded', highlight: true },
        { index: 3, text: 'K - Drift' },
        { index: 4, text: 'Y - Temp' },
        { index: 5, text: 'L - Decoded', highlight: true },
        { index: 6, text: 'B - Static' },
        { index: 7, text: 'Q - Noise' },
        { index: 8, text: 'U - Decoded', highlight: true },
        { index: 9, text: 'Z - Stream' },
        { index: 10, text: 'J - Clock' },
        { index: 11, text: 'E - Decoded', highlight: true }
      ]
    }
  },
  {
    id: 3,
    title: 'Training Data Poisoning',
    era: 'The Neural Rift - 2049',
    timeline: 'Protocol Zero',
    answer: 'MOLE',
    storyPrefix: 'The deep learning node is malfunctioning. A hostile entity has backdoored the models. Scanning the model weights, you discover ',
    hiddenClue: 'anomalous outlier values hidden in the matrix rows that form letters.',
    storySuffix: ' The cooling fans hum desperately, keeping the server rack at sub-zero temperatures.',
    puzzleContent: 'Locate the coordinates of the corrupted values to identify the backdoored keyword.',
    codeBlock: `Matrix Rows (Standard variance: 0.01)\nRow 0: [0.01, 0.02, 0.99 ('M'), 0.01]\nRow 1: [0.01, 0.88 ('O'), 0.02, 0.01]\nRow 2: [0.95 ('L'), 0.01, 0.01, 0.02]\nRow 3: [0.02, 0.01, 0.01, 0.91 ('E')]`,
    steps: [
      'Analyze the matrix elements.',
      'Identify values exceeding the baseline thresholds (values near ~0.9).',
      'Translate the indices or outlier labels into the name of the security threat.',
    ],
    hintLight: 'Normal weight values are close to 0.01. Anything above 0.8 is an outlier.',
    hintStrong: 'The letters corresponding to the outliers are: M in Row 0, O in Row 1, L in Row 2, E in Row 3.',
    colorTheme: 'Protocol Zero',
    organizerType: 'matrix-outlier',
    organizerData: {
      matrix: [
        [0.01, 0.02, 0.99, 0.01],
        [0.01, 0.88, 0.02, 0.01],
        [0.95, 0.01, 0.01, 0.02],
        [0.02, 0.01, 0.01, 0.91]
      ],
      chars: [
        ['.', '.', 'M', '.'],
        ['.', 'O', '.', '.'],
        ['L', '.', '.', '.'],
        ['.', '.', '.', 'E']
      ]
    }
  },
  {
    id: 4,
    title: 'Fake Verification',
    era: 'Midnight Masquerade - 1888',
    timeline: 'Midnight Carnival',
    answer: 'FOXTROT',
    storyPrefix: 'The Ringmaster requires a special passcode to view the main stage. He issues seven ticket numbers. To pass, you must understand that ',
    hiddenClue: 'only the ticket codes that satisfy the Luhn algorithm are valid. The valid ones yield the answer.',
    storySuffix: ' The carousel rotates slowly, its gold paint peeling.',
    puzzleContent: 'Run the Luhn Luhn checksum on ticket tokens to extract the verification word.',
    codeBlock: `Tokens:\n1. 49927398716 -> Valid (F)\n2. 49927398717 -> Invalid\n3. 51327901844 -> Valid (O)\n4. 60111111008 -> Valid (X)\n5. 71927398713 -> Valid (T)\n6. 89927398714 -> Valid (R)\n7. 99927398715 -> Valid (O)\n8. 10927398716 -> Valid (T)`,
    steps: [
      'Apply the Luhn checksum formula to each ticket number.',
      'Select only the tokens that return a valid mod-10 check digit.',
      'Concatenate the letters of valid tokens to form the masquerade password.',
    ],
    hintLight: 'Luhn involves doubling every second digit starting from the right.',
    hintStrong: 'The letters corresponding to the valid cards are F, O, X, T, R, O, T.',
    colorTheme: 'Midnight Carnival',
    organizerType: 'luhn-validator',
    organizerData: {
      tickets: [
        { code: '49927398716', label: 'Ticket #1', letter: 'F', valid: true },
        { code: '49927398717', label: 'Ticket #2', letter: 'S', valid: false },
        { code: '51327901844', label: 'Ticket #3', letter: 'O', valid: true },
        { code: '60111111008', label: 'Ticket #4', letter: 'X', valid: true },
        { code: '71927398713', label: 'Ticket #5', letter: 'T', valid: true },
        { code: '89927398714', label: 'Ticket #6', letter: 'R', valid: true },
        { code: '99927398715', label: 'Ticket #7', letter: 'O', valid: true },
        { code: '10927398716', label: 'Ticket #8', letter: 'T', valid: true }
      ]
    }
  },
  {
    id: 5,
    title: 'Neural Pathway Repair',
    era: 'Cybernetic Sanctum - 2049',
    timeline: 'Protocol Zero',
    answer: 'STOP',
    storyPrefix: 'The mainframe\'s firewall is closing in. You are trapped in the neural node path. Trace the glowing signals to discover ',
    hiddenClue: 'the node route spelling out a command in numeric alphabet values (19=S, 20=T, 15=O, 16=P).',
    storySuffix: ' The digital neon grid pulsates to your heartbeat.',
    puzzleContent: 'Connect the cyber synapse nodes in the correct chronological alphabetical sequence.',
    codeBlock: `Synapse node activation table:\nNode Alpha: Value 19\nNode Beta: Value 20\nNode Gamma: Value 15\nNode Delta: Value 16`,
    steps: [
      'Read the activation values for each node.',
      'Convert the integers to alphabetical letters (1=A, 2=B... 19=S).',
      'The letters form a directive to halt the system.',
    ],
    hintLight: '19th letter is S, 20th is T...',
    hintStrong: '19=S, 20=T, 15=O, 16=P. The code word is STOP.',
    colorTheme: 'Protocol Zero',
    organizerType: 'node-path',
    organizerData: {
      nodes: [
        { id: 19, letter: 'S' },
        { id: 20, letter: 'T' },
        { id: 15, letter: 'O' },
        { id: 16, letter: 'P' }
      ]
    }
  },
  {
    id: 6,
    title: 'Scroll Compression',
    era: 'Alexandria Archives - BC 47',
    timeline: 'Egyptian',
    answer: 'LIFE',
    storyPrefix: 'A charred fragment of papyrus contains a list of repeated glyph coordinates. To save memory, the scribes compressed it. You realize ',
    hiddenClue: 'the run-length encoding (RLE) is represented as: 3[L] 1[I] 2[F] 4[E]. Expand them.',
    storySuffix: ' The smell of old papyrus and cedar oil fill the air.',
    puzzleContent: 'Expand the run-length compressed data string to find the pharaoh\'s key.',
    codeBlock: `Compressed string: 3L1I2F4E\nDecodes to: L L L I F F E E E E`,
    steps: [
      'Observe the RLE notation: count followed by character.',
      'Expand the counts to restore the original string.',
      'Extract the unique distinct characters in sequence to find the word.',
    ],
    hintLight: 'Write down the characters corresponding to the counts.',
    hintStrong: '3 Ls, 1 I, 2 Fs, 4 Es. The original words contain the core word LIFE.',
    colorTheme: 'Egyptian',
    organizerType: 'rle-decoder',
    organizerData: {
      compressed: '3L1I2F4E',
      expected: 'LLLIFFEEEE'
    }
  },
  {
    id: 7,
    title: 'Memory Leak Cathedral',
    era: 'Cathedral of Ash - Lost Era',
    timeline: 'Dark Souls',
    answer: 'FREE',
    storyPrefix: 'You stand before the high altar of the Cathedral. Pointers wander unchecked in the memory heaps, causing the fire to fade. You notice ',
    hiddenClue: 'unallocated heap pointers dumping ASCII codes into log addresses: 0x46, 0x52, 0x45, 0x45.',
    storySuffix: ' The embers hiss in the wind. A dark sun hangs in the sky.',
    puzzleContent: 'Read the leaking hexadecimal memory register offsets to find what the fire desires.',
    codeBlock: `Heap Leak Dump:\nAddr 0x00F1: 0x46 (F)\nAddr 0x00F2: 0x52 (R)\nAddr 0x00F3: 0x45 (E)\nAddr 0x00F4: 0x45 (E)`,
    steps: [
      'Locate the leaked hex blocks.',
      'Convert each hex value to its character (0x46 = 70 in decimal = F).',
      'The letters will give you the path to break the curse.',
    ],
    hintLight: '0x46 is the letter F in hexadecimal ASCII tables.',
    hintStrong: '0x46=F, 0x52=R, 0x45=E, 0x45=E. The word is FREE.',
    colorTheme: 'Dark Souls',
    organizerType: 'hex-leak',
    organizerData: {
      leaks: [
        { addr: '0x00F1', hex: '46', char: 'F' },
        { addr: '0x00F2', hex: '52', char: 'R' },
        { addr: '0x00F3', hex: '45', char: 'E' },
        { addr: '0x00F4', hex: '45', char: 'E' }
      ]
    }
  },
  {
    id: 8,
    title: 'Dependency Curse',
    era: 'Ringed City Gates - Lost Era',
    timeline: 'Dark Souls',
    answer: 'SHIELD',
    storyPrefix: 'A massive gate blocks the inner sanctuary. The locking joints are bound by strict requirements. You see that ',
    hiddenClue: 'the joints must be resolved in topological sort order: S -> H -> I -> E -> L -> D.',
    storySuffix: ' Smoke rises from the abyss below the bridge.',
    puzzleContent: 'Order the component items such that every dependency is satisfied before its parent.',
    codeBlock: `Dependencies:\nS has no pre-requisites.\nH requires S.\nI requires H.\nE requires I.\nL requires E.\nD requires L.`,
    steps: [
      'Identify the item with zero dependencies to start.',
      'Construct a topological order of the dependency list.',
      'The letters of the ordered items spell out the defense of the kingdom.',
    ],
    hintLight: 'Sort from first to last to read the answer.',
    hintStrong: 'Order is S, then H, then I, then E, then L, then D. The word is SHIELD.',
    colorTheme: 'Dark Souls',
    organizerType: 'topo-sort',
    organizerData: {
      nodes: ['E', 'S', 'D', 'H', 'L', 'I'],
      correct: ['S', 'H', 'I', 'E', 'L', 'D']
    }
  },
  {
    id: 9,
    title: 'Load Balancer King',
    era: 'King\'s Landing Gates - Westeros',
    timeline: 'Game of Thrones',
    answer: 'EVEN',
    storyPrefix: 'Grain carriages accumulate outside the Red Keep. The Master of Coin demands an optimal distribution. You discover that ',
    hiddenClue: 'if you distribute the caravan weights symmetrically (even loads on each scale), the gate triggers open.',
    storySuffix: ' The golden lion standard flutters from the battlements.',
    puzzleContent: 'Symmetrically balance the loads across all gates to reveal the password.',
    codeBlock: `Scale L: [10kg, 20kg] = 30kg\nScale R: [15kg, 15kg] = 30kg\nSymmetrical distribution code: E-V-E-N`,
    steps: [
      'Observe the total weight on the scales.',
      'Ensure the left and right weights match perfectly.',
      'The balance state uncovers the code word.',
    ],
    hintLight: 'Both sides must sum to 30.',
    hintStrong: 'A balanced load is symmetric and EVEN.',
    colorTheme: 'Game of Thrones',
    organizerType: 'load-balancer',
    organizerData: {
      left: [10, 20],
      right: [15, 15],
      target: 30
    }
  },
  {
    id: 10,
    title: 'Broken Network',
    era: 'The Whispering Wood - Westeros',
    timeline: 'Game of Thrones',
    answer: 'BRIDGE',
    storyPrefix: 'Robb Stark\'s scouts report that the bridges over the Trident are broken. To coordinate the attack, you must realize ',
    hiddenClue: 'the critical path nodes that connect the scouts together spell out the word B-R-I-D-G-E.',
    storySuffix: ' Ironwood trees rustle as the wolves howl in the distance.',
    puzzleContent: 'Determine the vital connection bridge to secure Stark communications.',
    codeBlock: `Nodes:\n[Castle Black] - B -> R -> I -> [Trident] -> D -> G -> E -> [Winterfell]`,
    steps: [
      'Find the shortest path connecting the start node to the end node.',
      'Map the path letters in order.',
      'The letters reveal the node name.',
    ],
    hintLight: 'Trace the nodes from Castle Black to Winterfell.',
    hintStrong: 'The letters along the link spell BRIDGE.',
    colorTheme: 'Game of Thrones',
    organizerType: 'bridge-builder',
    organizerData: {
      paths: ['B', 'R', 'I', 'D', 'G', 'E']
    }
  },
  {
    id: 11,
    title: 'Virus Propagation',
    era: 'Raccoon City Lab - 1998',
    timeline: 'Resident Evil',
    answer: 'SCRAM',
    storyPrefix: 'The T-Virus has infected the laboratory mainframe. Cells are dying in a predictable grid pattern. Examining the containment system, you note ',
    hiddenClue: 'the immune cells that survive after 3 replication ticks spell out the emergency shutdown override: S-C-R-A-M.',
    storySuffix: ' An emergency siren wails in the red-lit hallway.',
    puzzleContent: 'Solve the cellular automaton grid sequence to obtain the security code.',
    codeBlock: `Survival Matrix (Surviving cells after 3 ticks):\nCell 1: S\nCell 2: C\nCell 3: R\nCell 4: A\nCell 5: M`,
    steps: [
      'Run the cell survival calculation.',
      'Locate the cells that survive the process.',
      'The letters on these cells contain the panic word.',
    ],
    hintLight: 'Containment override requires a rapid exit.',
    hintStrong: 'The surviving cells spell SCRAM.',
    colorTheme: 'Resident Evil',
    organizerType: 'virus-grid',
    organizerData: {
      cells: [
        { name: 'Alpha', char: 'S', active: true },
        { name: 'Beta', char: 'C', active: true },
        { name: 'Gamma', char: 'R', active: true },
        { name: 'Delta', char: 'A', active: true },
        { name: 'Epsilon', char: 'M', active: true }
      ]
    }
  },
  {
    id: 12,
    title: 'CAPTCHA Rebellion',
    era: 'Borderland Arena - Shibuya',
    timeline: 'Alice in Borderland',
    answer: 'HUMAN',
    storyPrefix: 'A laser pointer tracks your forehead. The overhead monitor displays a message: ARE YOU A MACHINE? You must verify that ',
    hiddenClue: 'you can read the distorted pixels. Align the grid lenses to read the word H-U-M-A-N.',
    storySuffix: ' The countdown timer is ticking down. 10 seconds remaining.',
    puzzleContent: 'Prove your biological status to bypass the lethal security system.',
    codeBlock: `Distorted CAPTCHA stream:\n[ H_U_M_A_N ]\nVerify identity to live.`,
    steps: [
      'Observe the distorted letter shapes.',
      'Align the perspective of the grid squares.',
      'Type the verification word into the system console.',
    ],
    hintLight: 'What makes you different from the machines?',
    hintStrong: 'Type the word HUMAN to solve the final borderland trial.',
    colorTheme: 'Alice in Borderland',
    organizerType: 'captcha-align',
    organizerData: {
      letters: ['H', 'U', 'M', 'A', 'N']
    }
  }
];
