# Algorithms in 1000 Words
**Purpose:** To visually explain a myriad of alogrithms through the magic of D3.

**Difficulty Scale:** Very ambitious, but please review before you jump to a decision.

### Background:

There are some algorithm visualization tools out there, but, from what I've observed,
they are very specialized and spread apart. Our goal is to create one central
repository that will compare the pros and cons of a multitude of algorithms.

I've taken the liberty of scanning through my old 'Data-Structures and Algorithms'
course syllabus, and compared it to some of those that I found online that belong
to other universities. For the most part, each of those classes roughly teach
the same basic concepts with little variation.

The essential Data-Structures Data-Structures to denote are Lists, Sets, Heaps, Trees, or Graphs. Similarly, there are essential algorithms fall under the categories of Shuffles, Sorts, Searches, Shortest-Paths, and Minimum-Spanning-Graphs.

In short there is a lot of ground to cover, The scope of this project is going to span 3 specific categories: Sorts, Binary Trees, and short-path algorithms.

These are the concepts that I am hoping to convey, visually:
#### Sorts
* *Bubble* - An easy-to-implement and easy-to-comprehend sort with O(n^2) runtime
* *Quick* - A very-very fast sort. The gold standard. However, suffers from recursion-complexity in some cases.
* *Insertion* - An okay sort with O(n^2) time complexity. VERY good on almost-sorted lists.
* *Merge* - A very fast sort O(n logn), but on avg not as good as QuickSort. O(N) space complexity is higher than average.
* *Random* - ~~My favorite sort. Say you have a deck. you throw the deck up into the air, collect the cards from the ground, and then check to see if the cards are sorted. If not, then repeat step 1. Has the best best-case out of all sorts.~~

#### Binary Search Trees
* *(Naive) Binary Tree* - Simple and very basic tree with no self-balancing mechanism. Search complexity can be O(n) when sequential inputs are added.
* *Red-Black Tree* - A self-balancing tree based on Red/Black Nodes.
* *AVL Tree* - An RB-Tree after it hit the gym. Better balancing mechanisms cause slower on insertion/deletion time, faster on search time, and higher space complexity.
* *Splay Trees* - When a node is accessed anywhere on the tree, the entire tree rearranges itself such that the accessed node becomes the root. Subsequent searches for the same item become O(1), but initial access can be O(n)

#### Graphs (Future Bonus)
* *Dijsktra* - Gold standard of shortest path searches. Can't deal with negative edge weights.
* *Belman-Ford* - A bit slower than Dijsktra's, but can handle negative edge weights.
* *Floyd-Warshall* - Good for finding the shortest paths of all pairs within a graph (no negative cycles). Best used for pre-computational use-cases.
* *A-star* - A brute-force version of Dijsktras using heuristics rather than a accurate costs; which can othen lead to quicker results.
