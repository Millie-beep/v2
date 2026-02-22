import { Type } from "@google/genai";

export enum Difficulty {
  BEGINNER = "初级",
  INTERMEDIATE = "中级",
  ADVANCED = "高级",
}

export enum Grade {
  PRIMARY_LOW = "小学低年级",
  PRIMARY_HIGH = "小学高年级",
  JUNIOR_HIGH = "初中",
}

export enum GrammarPoint {
  RELATIVE_CLAUSE = "定语从句",
  ADVERBIAL_CLAUSE = "状语从句",
  NON_FINITE_VERB = "非谓语动词",
  CONJUNCTION = "连词",
  ABSOLUTE_CONSTRUCTION = "独立主格",
  PREPOSITION = "介词",
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Explanation {
  correctAnswer: string;
  rule: string;
  example: string;
  pitfall: string;
}

export interface Question {
  id: string;
  sentence: string; // Use "____" for blanks
  options: Option[];
  explanation: Explanation;
  difficulty: Difficulty;
  grade: Grade;
  category: GrammarPoint;
}

export const QUESTION_BANK: Question[] = [
  {
    id: "1",
    sentence: "______ tired, she still finished the report.",
    options: [
      { id: "a", text: "Although", isCorrect: true },
      { id: "b", text: "Because", isCorrect: false },
      { id: "c", text: "Unless", isCorrect: false },
      { id: "d", text: "Since", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "Although",
      rule: "Although 引导让步状语从句，表示“尽管”。句子前半部分说“累”，后半部分说“完成了报告”，存在转折关系。",
      example: "Although it was raining, they went out for a walk.",
      pitfall: "不要在 Although 引导的句子中再使用 but。",
    },
    difficulty: Difficulty.BEGINNER,
    grade: Grade.PRIMARY_HIGH,
    category: GrammarPoint.ADVERBIAL_CLAUSE,
  },
  {
    id: "2",
    sentence: "The boy ______ is wearing a red hat is my brother.",
    options: [
      { id: "a", text: "which", isCorrect: false },
      { id: "b", text: "who", isCorrect: true },
      { id: "c", text: "whom", isCorrect: false },
      { id: "d", text: "whose", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "who",
      rule: "who 引导定语从句，修饰表示人的先行词（The boy），并在从句中作主语。",
      example: "The girl who is dancing is my sister.",
      pitfall: "which 只能修饰物，不能修饰人。",
    },
    difficulty: Difficulty.BEGINNER,
    grade: Grade.PRIMARY_HIGH,
    category: GrammarPoint.RELATIVE_CLAUSE,
  },
  {
    id: "3",
    sentence: "______ the homework, he went out to play football.",
    options: [
      { id: "a", text: "Finish", isCorrect: false },
      { id: "b", text: "Finished", isCorrect: false },
      { id: "c", text: "Having finished", isCorrect: true },
      { id: "d", text: "To finish", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "Having finished",
      rule: "现在分词的完成式（Having done）表示该动作在主句动作之前已经完成。这里“完成作业”发生在“出去踢球”之前。",
      example: "Having seen the film, I don't want to see it again.",
      pitfall: "如果用 Finishing，则表示两个动作几乎同时发生。",
    },
    difficulty: Difficulty.ADVANCED,
    grade: Grade.JUNIOR_HIGH,
    category: GrammarPoint.NON_FINITE_VERB,
  },
  {
    id: "4",
    sentence: "This is the house ______ I lived ten years ago.",
    options: [
      { id: "a", text: "which", isCorrect: false },
      { id: "b", text: "that", isCorrect: false },
      { id: "c", text: "where", isCorrect: true },
      { id: "d", text: "when", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "where",
      rule: "where 引导定语从句，修饰表示地点的先行词（the house），在从句中作地点状语（相当于 in which）。",
      example: "The school where I study is very beautiful.",
      pitfall: "如果从句中谓语动词是及物动词且缺宾语，则需用 which 或 that。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    grade: Grade.JUNIOR_HIGH,
    category: GrammarPoint.RELATIVE_CLAUSE,
  },
  {
    id: "5",
    sentence: "Weather ______, we will go for a picnic tomorrow.",
    options: [
      { id: "a", text: "permits", isCorrect: false },
      { id: "b", text: "permitting", isCorrect: true },
      { id: "c", text: "permitted", isCorrect: false },
      { id: "d", text: "to permit", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "permitting",
      rule: "独立主格结构。Weather 与 permit 之间是主动关系，因此使用现在分词 permitting。",
      example: "Time permitting, I'll visit you.",
      pitfall: "注意独立主格结构中名词与动词的逻辑关系是主动还是被动。",
    },
    difficulty: Difficulty.ADVANCED,
    grade: Grade.JUNIOR_HIGH,
    category: GrammarPoint.ABSOLUTE_CONSTRUCTION,
  },
  {
    id: "6",
    sentence: "I won't go to the party ______ I am invited.",
    options: [
      { id: "a", text: "if", isCorrect: false },
      { id: "b", text: "unless", isCorrect: true },
      { id: "c", text: "because", isCorrect: false },
      { id: "d", text: "as", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "unless",
      rule: "unless 引导条件状语从句，相当于 if...not，表示“除非”。",
      example: "You will fail unless you work hard.",
      pitfall: "不要混淆 unless (除非) 和 until (直到)。",
    },
    difficulty: Difficulty.BEGINNER,
    grade: Grade.PRIMARY_HIGH,
    category: GrammarPoint.CONJUNCTION,
  },
  {
    id: "7",
    sentence: "The news ______ he won the first prize made us very happy.",
    options: [
      { id: "a", text: "which", isCorrect: false },
      { id: "b", text: "that", isCorrect: true },
      { id: "c", text: "whether", isCorrect: false },
      { id: "d", text: "what", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "that",
      rule: "that 引导同位语从句，用于解释说明名词（The news）的具体内容，that 在从句中不作成分且无实际意义。",
      example: "The fact that he is honest is well known.",
      pitfall: "同位语从句与定语从句的区别：that 在同位语从句中不作成分，在定语从句中作主语或宾语。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    grade: Grade.JUNIOR_HIGH,
    category: GrammarPoint.ADVERBIAL_CLAUSE,
  },
  {
    id: "8",
    sentence: "It is high time that we ______ home.",
    options: [
      { id: "a", text: "go", isCorrect: false },
      { id: "b", text: "went", isCorrect: true },
      { id: "c", text: "are going", isCorrect: false },
      { id: "d", text: "will go", isCorrect: false },
    ],
    explanation: {
      correctAnswer: "went",
      rule: "It is (high) time that... 句型中，从句谓语动词用虚拟语气，通常用过去式（或 should + 动词原形，should 不可省略）。",
      example: "It is time that we started our work.",
      pitfall: "注意该句型中的虚拟语气用法，不要直接用一般现在时。",
    },
    difficulty: Difficulty.INTERMEDIATE,
    grade: Grade.JUNIOR_HIGH,
    category: GrammarPoint.ADVERBIAL_CLAUSE,
  },
];
