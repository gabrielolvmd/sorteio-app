import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dados-partida',
  templateUrl: './dados-partida.component.html',
  styleUrls: ['./dados-partida.component.scss'],
})
export class DadosPartidaComponent implements OnInit {
  nomes: string = '';
  numeroEquipes: number = 2;
  qtdJogadores: number = 0;
  titulo: string = '';
  mostrarTitulo = false;
  equipesSorteadas: any[] = [];

  constructor() {}

  onSortButtonClick() {
    const arrayNomes = this.nomes.split('\n');
    const qtdNomes = arrayNomes.length;

    if (qtdNomes < 2) {
      throw new Error('Escreva mais de um nome.');
    } else if (this.numeroEquipes < 2 || this.numeroEquipes > qtdNomes) {
      throw new Error(
        'O número de equipes tem que ser maior que dois e menor que a quantidade de nomes.'
      );
    } else {
      this.equipesSorteadas = this.sortearEquipes(
        arrayNomes,
        this.numeroEquipes
      );

      console.log(this.equipesSorteadas);
    }
    this.mostrarTitulo = true;
  }

  clear() {
    this.nomes = '';
    this.numeroEquipes = 2;
    this.titulo = '';
    this.mostrarTitulo = false;
  }

  sortearEquipes(nomes: string[], numeroDeEquipes: number) {
    // Embaralha a ordem dos nomes aleatoriamente
    const nomesEmbaralhados = [...(nomes || [])].sort(
      () => Math.random() - 0.5
    );

    // Verifica se há nomes para sortear
    if (nomesEmbaralhados.length === 0) {
      console.error('Não há nomes para sortear.');
      return [];
    }

    // Calcula a quantidade de membros em cada equipe
    const membrosPorEquipe = Math.floor(
      nomesEmbaralhados.length / numeroDeEquipes
    );

    // Inicializa as equipes
    const equipes = [];

    // Preenche as equipes com os nomes sorteados
    for (let i = 0; i < numeroDeEquipes; i++) {
      const equipe = nomesEmbaralhados.slice(
        i * membrosPorEquipe,
        (i + 1) * membrosPorEquipe
      );
      equipes.push({ nome: `Time ${i + 1}`, membros: equipe });
    }

    // Distribui membros restantes, se houver
    for (let i = 0; i < nomesEmbaralhados.length % numeroDeEquipes; i++) {
      const indexEquipe = i < numeroDeEquipes ? i : i - numeroDeEquipes;

      equipes[indexEquipe].membros.push(nomesEmbaralhados.pop()!);
    }

    return equipes;
  }

  onTituloInput() {
    this.mostrarTitulo = false;
  }

  onNomesInput(event: any) {
    const arrayNomes = this.nomes.split('\n');
    this.qtdJogadores = arrayNomes.filter((nome) => nome.trim() !== '').length;
  }

  ngOnInit(): void {}
}
