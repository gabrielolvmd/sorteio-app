import { Component, ElementRef, OnInit } from '@angular/core';
import { Jogador } from 'src/app/model/jogador.model';

@Component({
  selector: 'app-dados-partida-balanceada',
  templateUrl: './dados-partida-balanceada.component.html',
  styleUrls: ['./dados-partida-balanceada.component.scss'],
})
export class DadosPartidaBalanceadaComponent implements OnInit {
  nomes: string = '';
  numeroEquipes: number = 2;
  qtdJogadores: number = 0;
  titulo: string = '';
  errorMesage: string = '';

  mostrarTitulo: boolean = false;
  mostrarTimes: boolean = false;
  mostrarNivelJogadores: boolean = true;

  jogadores: Jogador[] = [];
  timesBalanceados: Jogador[][] = [];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  adjustPlayerLevelsButton() {
    this.jogadores = [];

    const arrayNomes = this.nomes.split('\n');
    const nomesValidos = arrayNomes.filter((nome) => nome !== '');
    const qtdNomes = nomesValidos.length;
    this.errorMesage = '';

    // Confere se existe mais que um nome e também se a quantidade de equipes ultrapassa a quantidade de nomes. Nesses casos é impossível realizar um sorteio.
    if (qtdNomes < 2) {
      this.errorMesage = 'Escreva mais de um nome.';
      throw new Error('Escreva mais de um nome.');
    } else if (this.numeroEquipes < 2 || this.numeroEquipes > qtdNomes) {
      this.errorMesage =
        'O número de equipes tem que ser maior que dois e menor que a quantidade de nomes.';
      throw new Error(
        'O número de equipes tem que ser maior que dois e menor que a quantidade de nomes.'
      );
    }

    // Reformula os nomes que ultrapassem 15 caracteres e substitui as últimas letras por (...)
    // obs: o array original é modificado aqui.
    nomesValidos.forEach((nome, index, array) => {
      if (nome.length > 15) {
        array[index] = nome.slice(0, 13).trim().concat('...');
      }
    });

    nomesValidos.forEach((nome) => {
      this.jogadores.push({ nome: nome, nivel: 0 });
    });

    this.mostrarTimes = true;
    this.mostrarNivelJogadores = true;

    setTimeout(() => {
      const editarJogadores = this.elementRef.nativeElement.querySelector(
        '.dados_container_editarJogadores'
      );
      this.scrollTo(editarJogadores);
    }, 100);
  }

  // Função para obter o índice do input marcado para um jogador específico
  obterIndiceNivelJogador(nomeJogador: string): number {
    // Obtém os elementos de input para o jogador atual
    const inputElements = document.getElementsByName(
      `nivelJogador-${nomeJogador}`
    );

    // Itera sobre os elementos para encontrar o input marcado
    for (let i = 0; i < inputElements.length; i++) {
      if ((inputElements[i] as HTMLInputElement).checked) {
        // Retorna o índice do input marcado
        return i;
      }
    }

    // Se nenhum input estiver marcado, retorna um valor padrão (pode ajustar conforme necessário)
    return 0;
  }

  sortearTimesBalanceados() {
    // Itera sobre a lista de jogadores
    this.jogadores.forEach((jogador) => {
      // Obtém o índice do input marcado para o jogador atual
      const indiceInputMarcado = this.obterIndiceNivelJogador(jogador.nome);

      // Atribui o valor do índice ao nível do jogador
      jogador.nivel = indiceInputMarcado;
    });

    // Ordena os jogadores por nível em ordem decrescente
    const jogadoresOrdenados = this.jogadores
      .slice()
      .sort((a, b) => b.nivel - a.nivel);

    // Inicializa os times
    const times: Jogador[][] = [];
    for (let i = 0; i < this.numeroEquipes; i++) {
      times.push([]);
    }

    // Calcula a média desejada de níveis por time
    const mediaDesejada =
      jogadoresOrdenados.reduce((soma, jogador) => soma + jogador.nivel, 0) /
      this.numeroEquipes;

    // Distribui os jogadores nos times tentando manter a soma próxima à média
    let timeAtual = 0;
    let jogadoresPorTime = Math.floor(
      this.jogadores.length / this.numeroEquipes
    );

    jogadoresOrdenados.forEach((jogador, index) => {
      if (timeAtual === this.numeroEquipes) {
        // Reinicia a distribuição para o primeiro time se todos os times foram usados
        timeAtual = 0;
      }

      // Verifica se o time atual já possui a quantidade máxima de jogadores
      if (times[timeAtual].length < jogadoresPorTime) {
        times[timeAtual].push(jogador);
        timeAtual++;
      }
    });

    this.mostrarTitulo = true;
    this.timesBalanceados = times;

    setTimeout(() => {
      const equipesSorteadasElement =
        this.elementRef.nativeElement.querySelector(
          '.dados_container_equipesBalanceadas'
        );
      this.scrollTo(equipesSorteadasElement);
    }, 100);
  }

  encontrarTimeMenosCheio(times: Jogador[][]): number {
    let indiceMenosCheio = 0;
    let menorSoma = times[0].reduce((soma, jogador) => soma + jogador.nivel, 0);

    for (let i = 1; i < times.length; i++) {
      const somaAtual = times[i].reduce(
        (soma, jogador) => soma + jogador.nivel,
        0
      );
      if (somaAtual < menorSoma) {
        menorSoma = somaAtual;
        indiceMenosCheio = i;
      }
    }

    return indiceMenosCheio;
  }

  calcularSomatorioPontos(time: Jogador[]): number {
    return time.reduce((soma, jogador) => soma + jogador.nivel, 0);
  }

  criarEstrelas(nivel: number): string {
    // Função para criar estrelas com base no nível
    return '⭐️'.repeat(nivel);
  }

  clear() {
    this.nomes = '';
    this.numeroEquipes = 2;
    this.titulo = '';
    this.qtdJogadores = 0;
    this.mostrarTitulo = false;
    this.mostrarTimes = false;
    this.jogadores = [];
    this.timesBalanceados = [];
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

  marcaEstrela(jogador: Jogador) {
    const indiceInputMarcado = this.obterIndiceNivelJogador(jogador.nome);
    const nivelJogador = indiceInputMarcado;

    const container = document.querySelector(
      `div[name="nivelJogador-${jogador.nome}"]`
    );

    const estrelas = container ? container.querySelectorAll('.fa-star') : [];
    estrelas.forEach((estrela) => {
      if (estrela.classList.contains('selected')) {
        estrela.classList.remove('selected');
      }
    });

    for (let i = 0; i < nivelJogador; i++) {
      estrelas[i].classList.add('selected');
    }
  }
}
