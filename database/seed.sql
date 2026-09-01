-- LogicSpark Seed Questions
-- Run this AFTER schema.sql in your Supabase SQL Editor

INSERT INTO questions (question_text, category, difficulty, option_a, option_b, option_c, option_d, correct_answer, explanation, hint) VALUES

-- ===== NUMBER & PATTERN REASONING =====

('What comes next in the series: 2, 4, 6, 8, ?', 'Number & Pattern Reasoning', 'Easy',
 '10', '12', '9', '11', 'A',
 'Each number increases by 2. 8 + 2 = 10.', 'Think about counting by 2s.'),

('Which number comes next: 5, 10, 15, 20, ?', 'Number & Pattern Reasoning', 'Easy',
 '25', '22', '30', '24', 'A',
 'The pattern increases by 5 each time. 20 + 5 = 25.', 'Each step adds the same number.'),

('Find the missing number: 3, 6, 9, ?, 15', 'Number & Pattern Reasoning', 'Easy',
 '10', '12', '11', '13', 'B',
 'The sequence counts by 3s: 3, 6, 9, 12, 15.', 'What number is between 9 and 15 when counting by 3s?'),

('What number should replace the question mark: 1, 4, 9, 16, ?', 'Number & Pattern Reasoning', 'Easy',
 '25', '20', '36', '24', 'A',
 'These are perfect squares: 1, 4, 9, 16, 25 (that is 1 squared, 2 squared, 3 squared, 4 squared, 5 squared).', 'Think about square numbers.'),

('Which number replaces the question mark: 8, 4, 2, 1, ?', 'Number & Pattern Reasoning', 'Medium',
 '0.5', '0', '2', '0.25', 'A',
 'Each number is divided by 2. 1 divided by 2 equals 0.5.', 'What happens when you keep halving?'),

('Find the missing number: 1, 1, 2, 3, 5, 8, ?', 'Number & Pattern Reasoning', 'Medium',
 '11', '12', '13', '10', 'C',
 'This is the Fibonacci sequence. Each number is the sum of the two before it. 5 + 8 = 13.', 'Each number is the sum of the previous two.'),

('What comes next: 2, 6, 12, 20, ?', 'Number & Pattern Reasoning', 'Medium',
 '28', '30', '25', '32', 'B',
 'These are products of consecutive numbers: 1x2=2, 2x3=6, 3x4=12, 4x5=20, 5x6=30.', 'Multiply consecutive numbers together.'),

('What comes next: 3, 7, 15, 31, ?', 'Number & Pattern Reasoning', 'Medium',
 '63', '47', '60', '45', 'A',
 'Each number is doubled then add 1: 3x2+1=7, 7x2+1=15, 15x2+1=31, 31x2+1=63.', 'Try doubling each number.'),

('Find the missing number: 2, 3, 5, 7, 11, ?', 'Number & Pattern Reasoning', 'Hard',
 '13', '12', '14', '15', 'A',
 'These are prime numbers in order. The next prime after 11 is 13.', 'These are special numbers with exactly two factors.'),

('What comes next: 1, 4, 27, 256, ?', 'Number & Pattern Reasoning', 'Hard',
 '3125', '1024', '625', '2048', 'A',
 'Each number is raised to its own power: 1^1=1, 2^2=4, 3^3=27, 4^4=256, 5^5=3125.', 'Think about numbers raised to their own power.'),

('Find the pattern: 0, 1, 1, 2, 3, 5, 8, 13, 21, ?', 'Number & Pattern Reasoning', 'Hard',
 '34', '24', '30', '28', 'A',
 'Fibonacci sequence: each term is the sum of the two preceding terms. 13 + 21 = 34.', 'Add the last two numbers together.'),

('What comes next: 1, 11, 21, 1211, 111221, ?', 'Number & Pattern Reasoning', 'Expert',
 '312211', '122221', '121211', '311221', 'A',
 'This is the look-and-say sequence. Each term describes the previous term. 111221 is read as one 1, one 2, two 1s, which gives 312211.', 'Read each number out loud - it describes the one before it.'),

('Find the missing number: 1, 8, 27, 64, 125, ?', 'Number & Pattern Reasoning', 'Expert',
 '216', '196', '256', '144', 'A',
 'These are perfect cubes: 1^3=1, 2^3=8, 3^3=27, 4^3=64, 5^3=125, 6^3=216.', 'Think about cube numbers.'),

('A train 120 m long passes a pole in 12 seconds. How long will it take to pass a platform 180 m long?', 'Number & Pattern Reasoning', 'Expert',
 '30 seconds', '25 seconds', '20 seconds', '35 seconds', 'A',
 'Speed = 120/12 = 10 m/s. Total distance = 120 + 180 = 300 m. Time = 300/10 = 30 seconds.', 'The train covers its own length plus the platform length.'),

-- ===== VERBAL REASONING =====

('Doctor is to Hospital as Teacher is to ?', 'Verbal Reasoning', 'Easy',
 'School', 'Book', 'Student', 'Class', 'A',
 'A doctor works in a hospital. A teacher works in a school.', 'Where does a teacher work?'),

('Cat is to Kitten as Dog is to ?', 'Verbal Reasoning', 'Easy',
 'Puppy', 'Pup', 'Doglet', 'Cub', 'A',
 'A baby cat is called a kitten. A baby dog is called a puppy.', 'What is a young dog called?'),

('Hand is to Glove as Foot is to ?', 'Verbal Reasoning', 'Easy',
 'Shoe', 'Sock', 'Boot', 'Sandal', 'A',
 'A glove covers a hand. A shoe covers a foot.', 'What covers your foot?'),

('Pen is to Writer as Brush is to ?', 'Verbal Reasoning', 'Medium',
 'Painter', 'Artist', 'Canvas', 'Art', 'A',
 'A pen is the tool of a writer. A brush is the tool of a painter.', 'Who uses a brush as their main tool?'),

('Eye is to See as Ear is to ?', 'Verbal Reasoning', 'Medium',
 'Hear', 'Listen', 'Sound', 'Noise', 'A',
 'We use our eyes to see. We use our ears to hear.', 'What do we use our ears for?'),

('Sculptor is to Marble as Composer is to ?', 'Verbal Reasoning', 'Hard',
 'Music', 'Notes', 'Instruments', 'Symphony', 'A',
 'A sculptor shapes marble into art. A composer shapes music into art.', 'What does a composer create?'),

('Which word does NOT belong: Apple, Banana, Carrot, Orange', 'Verbal Reasoning', 'Easy',
 'Carrot', 'Apple', 'Banana', 'Orange', 'A',
 'Apple, Banana, and Orange are all fruits. Carrot is a vegetable.', 'Which of these is not a fruit?'),

('Which word is different: Triangle, Square, Circle, Rectangle', 'Verbal Reasoning', 'Easy',
 'Circle', 'Triangle', 'Square', 'Rectangle', 'A',
 'Triangle, Square, and Rectangle have straight sides. A Circle is curved.', 'Which shape has no straight lines?'),

('Odd one out: Dog, Cat, Fish, Lion', 'Verbal Reasoning', 'Easy',
 'Fish', 'Dog', 'Cat', 'Lion', 'A',
 'Dog, Cat, and Lion are all mammals. Fish is not a mammal.', 'Which one does not breathe air from lungs?'),

('Odd one out: Mercury, Venus, Earth, Jupiter', 'Verbal Reasoning', 'Medium',
 'Jupiter', 'Mercury', 'Venus', 'Earth', 'A',
 'Mercury, Venus, and Earth are rocky inner planets. Jupiter is a gas giant.', 'Think about planet types.'),

('Odd one out: A, E, I, O, U, W', 'Verbal Reasoning', 'Medium',
 'W', 'A', 'E', 'I', 'A',
 'A, E, I, O, U are vowels. W is a consonant.', 'Which letter is not a vowel?'),

('In a code, PENCIL is written as LICNEP. How is ERASER written?', 'Verbal Reasoning', 'Easy',
 'RESARE', 'RESERA', 'RASERE', 'RESREA', 'A',
 'The word is reversed: PENCIL reversed is LICNEP. So ERASER reversed is RESARE.', 'Try reading the code backward.'),

('If A=1, B=2, C=3, what does the word BAD equal when you add the letter values?', 'Verbal Reasoning', 'Easy',
 '7', '6', '8', '5', 'A',
 'B=2, A=1, D=4. Sum = 2+1+4 = 7.', 'Add up the numbers for each letter.'),

('What comes next: A, C, E, G, ?', 'Verbal Reasoning', 'Easy',
 'I', 'H', 'J', 'K', 'A',
 'These skip one letter each time: A, (B), C, (D), E, (F), G, (H), I.', 'Skip one letter each time.'),

('Which letter is in the middle of the word REASONING?', 'Verbal Reasoning', 'Easy',
 'O', 'N', 'S', 'I', 'A',
 'REASONING has 9 letters. The middle (5th) letter is O.', 'Count to the center of the word.'),

('What is the 15th letter of the alphabet?', 'Verbal Reasoning', 'Easy',
 'O', 'N', 'P', 'Q', 'A',
 'The 15th letter of the alphabet is O.', 'Count from A.'),

('What comes next in the series: AZ, BY, CX, DW, ?', 'Verbal Reasoning', 'Medium',
 'EV', 'EU', 'FV', 'EX', 'A',
 'The first letters go forward: A, B, C, D, E. The second letters go backward: Z, Y, X, W, V. So EV.', 'One letter moves forward, the other moves backward.'),

('If in a code, A=1, B=2, C=3 continue up to Z=26, what does the word BED add up to?', 'Verbal Reasoning', 'Easy',
 '11', '10', '12', '9', 'A',
 'B=2, E=5, D=4. Sum = 2 + 5 + 4 = 11.', 'Write down the number value of each letter, then add them together.'),

('If NIGHT is coded as IGHNT, using the same rule, how is BASIC coded?', 'Verbal Reasoning', 'Medium',
 'ASBIC', 'ASIBC', 'SABIC', 'ASCIB', 'B',
 'In NIGHT, the first letter N moves to the fourth position: [I, G, H, N, T]. Applying the same rule to BASIC, B moves to the fourth position, giving A, S, I, B, C = ASIBC.', 'Look at where the first letter moves in the code.'),

('Statement: All birds can fly. A penguin is a bird. What follows logically from these statements?', 'Logical Reasoning', 'Medium',
 'A penguin can fly (according to the statement)', 'Penguins cannot fly', 'The statement is wrong', 'Penguins are not birds', 'A',
 'Logically, if all birds can fly and penguins are birds, then penguins can fly. This is what the statements imply, even though in real life penguins cannot fly.', 'Follow the logic, not real-world facts.'),

-- ===== LOGICAL REASONING =====

('All roses are flowers. Some flowers fade quickly. Which statement could be true?', 'Logical Reasoning', 'Easy',
 'Some roses may fade quickly', 'All roses fade quickly', 'No roses fade quickly', 'All flowers are roses', 'A',
 'Since some flowers fade quickly and roses are flowers, it is possible that some roses fade quickly.', 'Think about what definitely follows from the given statements.'),

('Which number is the odd one out: 2, 3, 5, 8, 11?', 'Logical Reasoning', 'Easy',
 '8', '3', '5', '11', 'A',
 '2, 3, 5, and 11 are all prime numbers. 8 is not prime because 8 = 2 x 4.', 'Think about what makes numbers special.'),

('Statement: If it rains, the ground gets wet. It rained. What can you conclude?', 'Logical Reasoning', 'Medium',
 'The ground got wet', 'The ground is dry', 'It will rain again', 'The ground might be wet', 'A',
 'This is a direct application of logic. If rain implies wet ground, and it rained, then the ground got wet.', 'This is a straightforward logical deduction.'),

('If A is taller than B, and B is taller than C, which is true?', 'Logical Reasoning', 'Medium',
 'A is tallest', 'C is tallest', 'B is tallest', 'They are same height', 'A',
 'By following the chain: A is taller than B, B is taller than C, so A is the tallest.', 'Think about who is tallest in the chain.'),

('No teachers are lazy. Mr. Smith is not lazy. Which conclusion is valid?', 'Logical Reasoning', 'Medium',
 'None of these definitely follow', 'Mr. Smith is a teacher', 'Mr. Smith is not a teacher', 'All non-lazy people are teachers', 'A',
 'The fact that Mr. Smith is not lazy does not mean he is a teacher. The statement says no teachers are lazy, but not all non-lazy people are teachers.', 'Be careful not to reverse the logic.'),

('If some books are novels, and all novels are fiction, which must be true?', 'Logical Reasoning', 'Medium',
 'Some books are fiction', 'All books are fiction', 'No books are fiction', 'All fiction are novels', 'A',
 'Since some books are novels and all novels are fiction, those books that are novels are also fiction. So some books are fiction.', 'Follow the chain of logic step by step.'),

('Statement 1: All mathematicians are logical. Statement 2: Some logical people are artists. Which must be true?', 'Logical Reasoning', 'Hard',
 'Some mathematicians could be artists', 'All mathematicians are artists', 'Some artists are mathematicians', 'No conclusion can be drawn', 'A',
 'Mathematicians are logical, and some logical people are artists. These groups overlap, but we cannot guarantee any mathematician is an artist. However, some could be.', 'Think about the overlap of the two groups.'),

('If P implies Q and Q implies R, and R is false, what can you conclude?', 'Logical Reasoning', 'Hard',
 'Both P and Q must be false', 'P must be false', 'Q must be false', 'Cannot determine P', 'A',
 'If R is false, then Q must be false (because if Q were true, R would be true). If Q is false, then P must be false (because if P were true, Q would be true). Both P and Q must be false.', 'Work backwards from R being false.'),

('If CHAIR = 5 and TABLE = 5, but PEN = 3, what does BOOK = ?', 'Logical Reasoning', 'Expert',
 '4', '3', '5', '2', 'A',
 'The code gives the number of letters. CHAIR has 5 letters, TABLE has 5 letters, PEN has 3 letters. So BOOK, which has 4 letters, equals 4.', 'Count the number of letters in each word.'),

('Five people sit in a row. A sits at the left end. B sits next to C. D sits at the right end. E sits between C and D. Who sits in the middle?', 'Logical Reasoning', 'Expert',
 'C', 'B', 'E', 'D', 'A',
 'From left to right: A, B, C, E, D. The middle person is C.', 'Place the constraints one at a time from left to right.'),

-- ===== SPATIAL REASONING =====

('If you face North and turn right, which direction are you facing?', 'Spatial Reasoning', 'Easy',
 'East', 'West', 'South', 'North', 'A',
 'When facing North, a right turn leads to East.', 'Visualize a compass in front of you.'),

('Rahul walks 5 km North, then turns right and walks 3 km. Which direction is he from the starting point?', 'Spatial Reasoning', 'Easy',
 'North-East', 'North-West', 'South-East', 'South-West', 'A',
 'He went North then turned right (East). So he is North-East of his starting point.', 'Combine the two directions.'),

('Priya faces West. She turns 180 degrees. Which direction does she face now?', 'Spatial Reasoning', 'Easy',
 'East', 'North', 'South', 'West', 'A',
 'A 180-degree turn from any direction leads to the opposite direction. West becomes East.', 'A half-turn reverses your direction.'),

('Amit walks 4 km East, turns left and walks 3 km, turns left and walks 4 km. How far is he from the start?', 'Spatial Reasoning', 'Medium',
 '3 km', '4 km', '5 km', '7 km', 'A',
 'He walks East 4, then North 3 (left from East), then West 4 (left from North). His east-west displacement is 0, and north-south is 3 km. Distance = 3 km.', 'Draw the path on paper.'),

('Seeta walks 6 km South, turns right and walks 4 km, turns right and walks 6 km. Which direction is she from the start?', 'Spatial Reasoning', 'Medium',
 'East', 'West', 'South', 'North', 'A',
 'She goes South 6, then East 4 (right from South), then North 6 (right from East). North cancels South. She is 4 km East of start.', 'Track her position step by step.'),

('If you walk 3 km North, then 4 km East, what is the straight-line distance from start?', 'Spatial Reasoning', 'Medium',
 '5 km', '7 km', '6 km', '25 km', 'A',
 'This forms a right triangle with sides 3 and 4. By the Pythagorean theorem: square root of (9 + 16) = square root of 25 = 5 km.', 'Use the Pythagorean theorem.'),

('A cube has 6 faces. If you unfold a cube into a flat net, how many squares will be in the net?', 'Spatial Reasoning', 'Easy',
 '6', '5', '4', '7', 'A',
 'A cube always has 6 faces, so unfolding it into a net gives 6 squares.', 'Count the faces of a cube.'),

('A dice has 1 opposite 6, 2 opposite 5, 3 opposite 4. If 1 is on top and 2 is facing you, what number is on the right side?', 'Spatial Reasoning', 'Medium',
 '3', '4', '5', '6', 'A',
 'If 1 is top, then 6 is bottom. If 2 is front, then 5 is back. The remaining faces 3 and 4 are on left and right. Using standard dice orientation, 3 is on the right.', 'Eliminate what you know and figure out the remaining faces.'),

('If you rotate a shape 90 degrees clockwise, a line pointing up will point in which direction?', 'Spatial Reasoning', 'Medium',
 'Right', 'Left', 'Down', 'Up', 'A',
 'A 90-degree clockwise rotation turns up into right.', 'Think about the direction of clock hands.'),

-- ===== ARRANGEMENT & PUZZLE REASONING =====

('In a race, Tom finished ahead of Sam. Sam finished ahead of Ali. Who finished last?', 'Arrangement & Puzzle Reasoning', 'Easy',
 'Ali', 'Tom', 'Sam', 'They tied', 'A',
 'Tom first, Sam second, Ali third (last).', 'Follow the order from first to last.'),

('Lisa is taller than Mike but shorter than Anna. Who is the shortest?', 'Arrangement & Puzzle Reasoning', 'Easy',
 'Mike', 'Lisa', 'Anna', 'Cannot tell', 'A',
 'Anna is tallest, Lisa is middle, Mike is shortest.', 'Put them in order from tallest to shortest.'),

('Five students scored: 90, 85, 78, 72, 65. Who scored the second highest?', 'Arrangement & Puzzle Reasoning', 'Easy',
 '85', '90', '78', '72', 'A',
 'The marks in descending order are 90, 85, 78, 72, 65. The second highest is 85.', 'Look for the number just below the highest.'),

('In a class of 30 students, Ravi ranks 12th from the top. What is his rank from the bottom?', 'Arrangement & Puzzle Reasoning', 'Medium',
 '19', '20', '18', '21', 'A',
 'Rank from bottom = Total - Rank from top + 1 = 30 - 12 + 1 = 19.', 'Use the formula: rank from bottom = total - rank from top + 1.'),

('In a queue, Aman is 7th from the front and 18th from the back. How many people are in the queue?', 'Arrangement & Puzzle Reasoning', 'Medium',
 '24', '25', '23', '26', 'A',
 'Total = front rank + back rank - 1 = 7 + 18 - 1 = 24. Aman is counted in both positions, so subtract 1.', 'Be careful not to double-count Aman.'),

('Five friends A, B, C, D, E sit in a row facing north. A sits at the left end. B sits immediately right of A. C sits at the right end. Where do D and E sit?', 'Arrangement & Puzzle Reasoning', 'Medium',
 'Between B and C', 'At the left end', 'Immediately left of C', 'Next to A', 'A',
 'Positions from left: A, B, _, _, C. D and E fill the middle two positions between B and C.', 'Start placing from the known positions.'),

('A, B, C, D sit around a circular table. A sits opposite C. B sits to the right of A. Who sits opposite B?', 'Arrangement & Puzzle Reasoning', 'Medium',
 'D', 'A', 'C', 'Cannot determine', 'A',
 'A is opposite C. B is to the right of A. So D must be opposite B.', 'Draw a circle and place them one at a time.'),

('In a family of 6 people: A is the father of B. C is the mother of A. D is the wife of A. E is the daughter of B. F is the brother of B. How is C related to E?', 'Arrangement & Puzzle Reasoning', 'Medium',
 'Grandmother', 'Mother', 'Aunt', 'Great-grandmother', 'A',
 'C is the mother of A. A is the father of B. B is the parent of E. So C is the grandmother of E.', 'Trace the family tree step by step.'),

('If you have 3 apples and give away 2, then buy 5 more, how many do you have?', 'Arrangement & Puzzle Reasoning', 'Easy',
 '6', '5', '4', '7', 'A',
 '3 minus 2 plus 5 equals 6 apples.', 'Just follow the operations step by step.'),

('A is twice as old as B. Five years ago, A was three times as old as B. How old is A now?', 'Arrangement & Puzzle Reasoning', 'Hard',
 '20', '15', '10', '25', 'A',
 'Let B equal x, then A equals 2x. Five years ago: 2x-5 = 3(x-5). Solving: 2x-5 = 3x-15, so x = 10. A = 20.', 'Set up an equation with their ages.'),

('Six people A-F sit around a circular table. A sits opposite D. B sits between A and C. E sits opposite B. F sits between D and E. Who sits opposite C?', 'Arrangement & Puzzle Reasoning', 'Hard',
 'F', 'E', 'B', 'D', 'A',
 'Working through the constraints: A is opposite D, B is opposite E. That leaves C opposite F.', 'Place each person using the given constraints.'),

('What is the minimum number of weighings needed to find the heaviest ball among 12 identical balls using a balance scale?', 'Logical Reasoning', 'Expert',
 '3', '4', '2', '5', 'A',
 'Divide into 3 groups of 4. Weigh two groups to find which group has the heavy ball (or if equal, it is the third group). Then divide that group of 4 into 3+1 and continue. Total: 3 weighings.', 'Try dividing the balls into three equal groups.'),

-- ===== NON-VERBAL REASONING (Text-described) =====

('In a series: circle, triangle, square, pentagon. What shape comes next?', 'Non-Verbal Reasoning', 'Easy',
 'Hexagon', 'Heptagon', 'Octagon', 'Circle', 'A',
 'Each shape has one more side than the previous: circle (1 curve), triangle (3), square (4), pentagon (5), hexagon (6).', 'Count the number of sides of each shape.'),

('A dot moves clockwise around a square, one corner at a time. Starting at the top-left corner, after 3 moves where is the dot?', 'Non-Verbal Reasoning', 'Easy',
 'Bottom-left corner', 'Bottom-right corner', 'Top-right corner', 'Top-left corner', 'A',
 'Move 1: top-right. Move 2: bottom-right. Move 3: bottom-left.', 'Trace the path one step at a time.'),

('In a pattern, shapes alternate: circle, square, circle, square, circle. What comes next?', 'Non-Verbal Reasoning', 'Medium',
 'Square', 'Circle', 'Triangle', 'Rectangle', 'A',
 'The pattern alternates between circle and square. After circle comes square.', 'Look at the alternating pattern.'),

('A plus sign (+) and an X are combined. How many line segments does the combined shape have?', 'Non-Verbal Reasoning', 'Medium',
 '8', '4', '6', '10', 'A',
 'A plus sign has 4 line segments (up, down, left, right from center). An X has 4 diagonal segments. Together: 8 segments.', 'Count the segments from each shape.'),

('If you hold the word RED up to a mirror, which word would you see?', 'Non-Verbal Reasoning', 'Easy',
 'DER (horizontally flipped)', 'RED', 'DER', 'BED', 'C',
 'A mirror reverses left and right. RED reversed reads DER.', 'Imagine the letters reversed left to right.'),

('A circular paper is folded in half, then in half again to make a quarter circle. A cut is made across the folded tip. When unfolded, how many cuts appear on the circle?', 'Non-Verbal Reasoning', 'Medium',
 '4', '1', '2', '8', 'A',
 'Folding twice creates 4 layers. A cut through all layers creates 4 cuts when unfolded, one in each quadrant.', 'Each layer gets its own cut.');

