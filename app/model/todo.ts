export class Todo {
     _id: string;
     autor: string;
     texto: string;
    linea: string;
     votes: number;
    __v: number;
    constructor(autor: string, texto: string, linea: string, votes: number) {
        this.autor = autor;
        this.texto = texto;
        this.linea = linea;
        this.votes = votes;
    }
    voteUp() {
        this.votes += 1;
    }
    voteDown() {
        this.votes -= 1;
    }
}
