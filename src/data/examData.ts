export type QuestionType = 'single' | 'multi' | 'fill-blank';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: Option[];
  correctAnswers: string[]; // array of option ids or text for fill-blank
  explanation: string;
  points: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  totalQuestions: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  questions: Question[];
}

export const exams: Exam[] = [
  {
    id: 'network-security-fundamentals',
    title: 'Network Security Fundamentals',
    description: 'Test your knowledge of basic network security concepts, protocols, and best practices.',
    duration: 30,
    totalQuestions: 10,
    difficulty: 'Beginner',
    category: 'Network Security',
    questions: [
      {
        id: 'q1',
        type: 'single',
        question: 'Which protocol is used to securely transfer files over a network?',
        options: [
          { id: 'a', text: 'FTP' },
          { id: 'b', text: 'SFTP' },
          { id: 'c', text: 'HTTP' },
          { id: 'd', text: 'SMTP' },
        ],
        correctAnswers: ['b'],
        explanation: 'SFTP (Secure File Transfer Protocol) encrypts both commands and data, providing secure file transfer. FTP sends data in plain text.',
        points: 10,
      },
      {
        id: 'q2',
        type: 'multi',
        question: 'Which of the following are types of firewalls? (Select all that apply)',
        options: [
          { id: 'a', text: 'Packet Filtering Firewall' },
          { id: 'b', text: 'Stateful Inspection Firewall' },
          { id: 'c', text: 'Application Gateway' },
          { id: 'd', text: 'DNS Firewall' },
        ],
        correctAnswers: ['a', 'b', 'c'],
        explanation: 'Packet Filtering, Stateful Inspection, and Application Gateway (Proxy) are all types of firewalls. DNS Firewall is not a standard firewall type.',
        points: 15,
      },
      {
        id: 'q3',
        type: 'fill-blank',
        question: 'The port number for HTTPS is ___.',
        correctAnswers: ['443'],
        explanation: 'HTTPS uses port 443 by default, while HTTP uses port 80.',
        points: 10,
      },
      {
        id: 'q4',
        type: 'single',
        question: 'What does the "S" in HTTPS stand for?',
        options: [
          { id: 'a', text: 'Simple' },
          { id: 'b', text: 'Secure' },
          { id: 'c', text: 'Standard' },
          { id: 'd', text: 'Server' },
        ],
        correctAnswers: ['b'],
        explanation: 'HTTPS stands for HyperText Transfer Protocol Secure. It uses TLS/SSL to encrypt communication.',
        points: 10,
      },
      {
        id: 'q5',
        type: 'single',
        question: 'Which attack involves intercepting communication between two parties?',
        options: [
          { id: 'a', text: 'DDoS Attack' },
          { id: 'b', text: 'Man-in-the-Middle Attack' },
          { id: 'c', text: 'SQL Injection' },
          { id: 'd', text: 'Brute Force Attack' },
        ],
        correctAnswers: ['b'],
        explanation: 'A Man-in-the-Middle (MITM) attack occurs when an attacker secretly intercepts and potentially alters communication between two parties.',
        points: 10,
      },
      {
        id: 'q6',
        type: 'multi',
        question: 'Which of the following are symmetric encryption algorithms? (Select all that apply)',
        options: [
          { id: 'a', text: 'AES' },
          { id: 'b', text: 'RSA' },
          { id: 'c', text: 'DES' },
          { id: 'd', text: 'Blowfish' },
        ],
        correctAnswers: ['a', 'c', 'd'],
        explanation: 'AES, DES, and Blowfish are symmetric encryption algorithms. RSA is an asymmetric (public-key) encryption algorithm.',
        points: 15,
      },
      {
        id: 'q7',
        type: 'fill-blank',
        question: 'A ___ is a network security device that monitors incoming and outgoing network traffic.',
        correctAnswers: ['firewall', 'Firewall', 'FIREWALL'],
        explanation: 'A firewall monitors and filters incoming and outgoing network traffic based on predetermined security rules.',
        points: 10,
      },
      {
        id: 'q8',
        type: 'single',
        question: 'What is the purpose of a VPN?',
        options: [
          { id: 'a', text: 'To speed up internet connection' },
          { id: 'b', text: 'To create a secure tunnel for data transmission' },
          { id: 'c', text: 'To block all incoming traffic' },
          { id: 'd', text: 'To store passwords securely' },
        ],
        correctAnswers: ['b'],
        explanation: 'A VPN (Virtual Private Network) creates an encrypted tunnel for secure data transmission over public networks.',
        points: 10,
      },
      {
        id: 'q9',
        type: 'single',
        question: 'Which layer of the OSI model does a MAC address operate at?',
        options: [
          { id: 'a', text: 'Physical Layer' },
          { id: 'b', text: 'Data Link Layer' },
          { id: 'c', text: 'Network Layer' },
          { id: 'd', text: 'Transport Layer' },
        ],
        correctAnswers: ['b'],
        explanation: 'MAC addresses operate at the Data Link Layer (Layer 2) of the OSI model.',
        points: 10,
      },
      {
        id: 'q10',
        type: 'multi',
        question: 'Which of the following are common network security threats? (Select all that apply)',
        options: [
          { id: 'a', text: 'Phishing' },
          { id: 'b', text: 'Ransomware' },
          { id: 'c', text: 'Defragmentation' },
          { id: 'd', text: 'Zero-day exploits' },
        ],
        correctAnswers: ['a', 'b', 'd'],
        explanation: 'Phishing, Ransomware, and Zero-day exploits are security threats. Defragmentation is a disk optimization process, not a security threat.',
        points: 15,
      },
    ],
  },
  {
    id: 'advanced-cryptography',
    title: 'Advanced Cryptography',
    description: 'Deep dive into cryptographic algorithms, key management, and secure protocols.',
    duration: 45,
    totalQuestions: 12,
    difficulty: 'Advanced',
    category: 'Cryptography',
    questions: [
      {
        id: 'ac1',
        type: 'single',
        question: 'What key length does AES-256 use?',
        options: [
          { id: 'a', text: '128 bits' },
          { id: 'b', text: '192 bits' },
          { id: 'c', text: '256 bits' },
          { id: 'd', text: '512 bits' },
        ],
        correctAnswers: ['c'],
        explanation: 'AES-256 uses a 256-bit key length, offering the highest level of security among AES variants.',
        points: 10,
      },
      {
        id: 'ac2',
        type: 'fill-blank',
        question: 'The process of converting ciphertext back to plaintext is called ___.',
        correctAnswers: ['decryption', 'Decryption', 'DECRYPTION'],
        explanation: 'Decryption is the reverse process of encryption, converting encrypted data back to its original form.',
        points: 10,
      },
      {
        id: 'ac3',
        type: 'multi',
        question: 'Which hash functions are considered cryptographically secure for modern use? (Select all that apply)',
        options: [
          { id: 'a', text: 'MD5' },
          { id: 'b', text: 'SHA-256' },
          { id: 'c', text: 'SHA-3' },
          { id: 'd', text: 'SHA-1' },
        ],
        correctAnswers: ['b', 'c'],
        explanation: 'SHA-256 and SHA-3 are considered secure. MD5 and SHA-1 have known vulnerabilities and should not be used for security purposes.',
        points: 15,
      },
    ],
  },
  {
    id: 'network-protocols',
    title: 'Network Protocols & Architecture',
    description: 'Master TCP/IP, OSI model, and common network protocols.',
    duration: 35,
    totalQuestions: 10,
    difficulty: 'Intermediate',
    category: 'Networking',
    questions: [
      {
        id: 'np1',
        type: 'single',
        question: 'Which layer of the OSI model is responsible for routing?',
        options: [
          { id: 'a', text: 'Data Link Layer' },
          { id: 'b', text: 'Network Layer' },
          { id: 'c', text: 'Transport Layer' },
          { id: 'd', text: 'Session Layer' },
        ],
        correctAnswers: ['b'],
        explanation: 'The Network Layer (Layer 3) handles routing of data packets between networks using IP addresses.',
        points: 10,
      },
      {
        id: 'np2',
        type: 'fill-blank',
        question: 'TCP provides ___ delivery of data packets.',
        correctAnswers: ['reliable', 'Reliable', 'RELIABLE', 'guaranteed', 'Guaranteed'],
        explanation: 'TCP (Transmission Control Protocol) provides reliable, ordered delivery of data through acknowledgments and retransmissions.',
        points: 10,
      },
      {
        id: 'np3',
        type: 'multi',
        question: 'Which protocols operate at the Application Layer? (Select all that apply)',
        options: [
          { id: 'a', text: 'HTTP' },
          { id: 'b', text: 'TCP' },
          { id: 'c', text: 'DNS' },
          { id: 'd', text: 'FTP' },
        ],
        correctAnswers: ['a', 'c', 'd'],
        explanation: 'HTTP, DNS, and FTP operate at the Application Layer (Layer 7). TCP operates at the Transport Layer (Layer 4).',
        points: 15,
      },
    ],
  },
];

export interface ExamResult {
  examId: string;
  examTitle: string;
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number; // in seconds
  date: string;
  answers: {
    questionId: string;
    userAnswer: string[];
    isCorrect: boolean;
  }[];
}

// Mock previous results
export const mockResults: ExamResult[] = [
  {
    examId: 'network-security-fundamentals',
    examTitle: 'Network Security Fundamentals',
    score: 85,
    totalPoints: 115,
    correctAnswers: 8,
    totalQuestions: 10,
    timeTaken: 1200,
    date: '2025-01-08',
    answers: [],
  },
  {
    examId: 'network-protocols',
    examTitle: 'Network Protocols & Architecture',
    score: 70,
    totalPoints: 35,
    correctAnswers: 2,
    totalQuestions: 3,
    timeTaken: 900,
    date: '2025-01-05',
    answers: [],
  },
];
