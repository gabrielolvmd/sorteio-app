import { Component, ElementRef, OnInit } from '@angular/core';

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
  mostrarTitulo: boolean = false;
  mostrarTimes: boolean = false;
  equipesSorteadas: any[] = [];
  errorMesage: string = '';

  constructor(private elementRef: ElementRef) {}

  onSortButtonClick() {
    const arrayNomes = this.nomes.split('\n');
    const nomesValidos = arrayNomes.filter((nome) => nome !== '');
    const qtdNomes = nomesValidos.length;
    this.errorMesage = '';
    if (qtdNomes < 2) {
      this.errorMesage = 'Escreva mais de um nome.';
      throw new Error('Escreva mais de um nome.');
    } else if (this.numeroEquipes < 2 || this.numeroEquipes > qtdNomes) {
      this.errorMesage =
        'O número de equipes tem que ser maior que dois e menor que a quantidade de nomes.';
      throw new Error(
        'O número de equipes tem que ser maior que dois e menor que a quantidade de nomes.'
      );
    } else {
      this.equipesSorteadas = this.sortearEquipes(
        nomesValidos,
        this.numeroEquipes
      );

      console.log(this.equipesSorteadas);
    }
    this.mostrarTitulo = true;
    this.mostrarTimes = true;

    setTimeout(() => {
      const equipesSorteadasElement =
        this.elementRef.nativeElement.querySelector(
          '.dados_container_equipesSorteadas'
        );
      this.scrollTo(equipesSorteadasElement);
    }, 100);
  }

  clear() {
    this.nomes = '';
    this.numeroEquipes = 2;
    this.titulo = '';
    this.qtdJogadores = 0;
    this.mostrarTitulo = false;
    this.mostrarTimes = false;
  }

  sortearEquipes(nomes: string[], numeroDeEquipes: number) {
    // Reformula os nomes que ultrapassem 15 caracteres e substitui as últimas letras por (...)
    // obs: o array original é modificado aqui.
    nomes.forEach((nome, index, array) => {
      if (nome.length > 15) {
        array[index] = nome.slice(0, 13).trim().concat('...');
      }
    });

    console.log(nomes);

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

  scrollTo(element: HTMLElement) {
    if (element) {
      const posicao = element.getBoundingClientRect();

      // Adiciona a posição atual da rolagem para obter a posição absoluta
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const posicaoAbsoluta = posicao.top + scrollTop;

      // Rola até a posição absoluta com suavidade
      window.scrollTo({
        top: posicaoAbsoluta,
        behavior: 'smooth',
      });
    }
  }

  ngOnInit(): void {}
}
