from typing import List, Tuple

def read_graph(filename: str) -> Tuple[List[List[int]], int]:
    with open(filename, 'r') as file:
        lines = file.readlines()
    n = int(lines[0].strip())
    adjacency_list = [list(map(int, line.strip().split()))[1:] for line in lines[1:]]
    return adjacency_list, n

def write_neighbours_list(adjacency_list: List[List[int]]) -> None:
    for i, neighbours in enumerate(adjacency_list):
        print(f"Sąsiadami wierzchołka {i} sa: {', '.join(map(str, neighbours))}")

def list_to_matrix(adjacency_list: List[List[int]]) -> List[List[int]]:
    n = len(adjacency_list)
    matrix = [[0] * n for _ in range(n)]
    for i, neighbours in enumerate(adjacency_list):
        for j in neighbours:
            matrix[i][j] = 1
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    for row in matrix:
        print(' '.join(map(str, row)))

def main() -> None:
    adjacency_list, n = read_graph('graph.txt')
    write_neighbours_list(adjacency_list)
    matrix = list_to_matrix(adjacency_list)
    write_matrix(matrix)

main()
