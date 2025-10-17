import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Pizza, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const tamanhos = [
  { id: "pequena", nome: "Pequena", tamanho: "25cm", fatias: "4 fatias", preco: 35 },
  { id: "media", nome: "Média", tamanho: "30cm", fatias: "6 fatias", preco: 45 },
  { id: "grande", nome: "Grande", tamanho: "35cm", fatias: "8 fatias", preco: 55 },
  { id: "familia", nome: "Família", tamanho: "40cm", fatias: "12 fatias", preco: 70 },
];

const sabores = [
  { id: "margherita", nome: "Margherita", ingredientes: ["Mussarela", "Tomate", "Manjericão"] },
  { id: "calabresa", nome: "Calabresa", ingredientes: ["Calabresa", "Cebola", "Azeitona"] },
  { id: "portuguesa", nome: "Portuguesa", ingredientes: ["Presunto", "Ovo", "Cebola", "Ervilha"] },
  { id: "frango", nome: "Frango", ingredientes: ["Frango", "Catupiry", "Milho"] },
  { id: "bacon", nome: "Bacon", ingredientes: ["Bacon", "Mussarela", "Tomate"] },
  { id: "vegetariana", nome: "Vegetariana", ingredientes: ["Brócolis", "Palmito", "Champignon"] },
  { id: "4queijos", nome: "4 Queijos", ingredientes: ["Mussarela", "Parmesão", "Gorgonzola", "Provolone"] },
];

const bordas = [
  { id: "tradicional", nome: "Tradicional", preco: 0 },
  { id: "catupiry", nome: "Catupiry", preco: 8 },
  { id: "cheddar", nome: "Cheddar", preco: 8 },
  { id: "chocolate", nome: "Chocolate", preco: 10 },
];

const ingredientesExtras = [
  "Bacon", "Calabresa", "Frango", "Catupiry", "Cheddar", 
  "Champignon", "Palmito", "Milho", "Azeitona", "Tomate"
];

const Pedido = () => {
  const navigate = useNavigate();
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [saboresSelecionados, setSaboresSelecionados] = useState<string[]>([]);
  const [bordaSelecionada, setBordaSelecionada] = useState("tradicional");
  const [ingredientesAdicionar, setIngredientesAdicionar] = useState<string[]>([]);
  const [ingredientesRemover, setIngredientesRemover] = useState<string[]>([]);

  const maxSabores = tamanhoSelecionado === "pequena" ? 1 : tamanhoSelecionado === "media" ? 2 : 3;

  const calcularTotal = () => {
    const tamanho = tamanhos.find(t => t.id === tamanhoSelecionado);
    const borda = bordas.find(b => b.id === bordaSelecionada);
    if (!tamanho || !borda) return 0;
    
    const precoExtras = ingredientesAdicionar.length * 3;
    return tamanho.preco + borda.preco + precoExtras;
  };

  const toggleSabor = (saborId: string) => {
    if (saboresSelecionados.includes(saborId)) {
      setSaboresSelecionados(saboresSelecionados.filter(id => id !== saborId));
    } else if (saboresSelecionados.length < maxSabores) {
      setSaboresSelecionados([...saboresSelecionados, saborId]);
    } else {
      toast.error(`Máximo de ${maxSabores} sabores para este tamanho!`);
    }
  };

  const getIngredientesDisponiveis = () => {
    const ingredientesSet = new Set<string>();
    saboresSelecionados.forEach(saborId => {
      const sabor = sabores.find(s => s.id === saborId);
      sabor?.ingredientes.forEach(ing => ingredientesSet.add(ing));
    });
    return Array.from(ingredientesSet);
  };

  const toggleIngrediente = (ingrediente: string, tipo: "adicionar" | "remover") => {
    if (tipo === "adicionar") {
      setIngredientesAdicionar(prev => 
        prev.includes(ingrediente) ? prev.filter(i => i !== ingrediente) : [...prev, ingrediente]
      );
    } else {
      setIngredientesRemover(prev =>
        prev.includes(ingrediente) ? prev.filter(i => i !== ingrediente) : [...prev, ingrediente]
      );
    }
  };

  const finalizarPedido = () => {
    if (!tamanhoSelecionado) {
      toast.error("Selecione um tamanho!");
      return;
    }
    if (saboresSelecionados.length === 0) {
      toast.error("Selecione pelo menos um sabor!");
      return;
    }

    const tamanho = tamanhos.find(t => t.id === tamanhoSelecionado);
    const saboresNomes = saboresSelecionados
      .map(id => sabores.find(s => s.id === id)?.nome)
      .join(", ");
    const borda = bordas.find(b => b.id === bordaSelecionada);
    
    let mensagem = `🍕 *Novo Pedido!*\n\n`;
    mensagem += `*Tamanho:* ${tamanho?.nome} (${tamanho?.tamanho})\n`;
    mensagem += `*Sabores:* ${saboresNomes}\n`;
    mensagem += `*Borda:* ${borda?.nome}\n`;
    
    if (ingredientesAdicionar.length > 0) {
      mensagem += `*Adicionar:* ${ingredientesAdicionar.join(", ")}\n`;
    }
    if (ingredientesRemover.length > 0) {
      mensagem += `*Remover:* ${ingredientesRemover.join(", ")}\n`;
    }
    
    mensagem += `\n*Total:* R$ ${calcularTotal().toFixed(2)}`;

const mensagem = "Olá! Gostaria de finalizar meu pedido 😊";
const whatsappUrl = `https://wa.me/5551997652633?text=${encodeURIComponent(mensagem)}`;
window.open(whatsappUrl, '_blank');



  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <Pizza className="w-10 h-10 text-primary" />
              Monte sua Pizza
            </h1>
            <p className="text-muted-foreground mt-1">
              Personalize do seu jeito!
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tamanho */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">1. Escolha o Tamanho</h2>
                <RadioGroup value={tamanhoSelecionado} onValueChange={setTamanhoSelecionado}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {tamanhos.map((tamanho) => (
                      <div key={tamanho.id} className="relative">
                        <RadioGroupItem
                          value={tamanho.id}
                          id={tamanho.id}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={tamanho.id}
                          className="flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                        >
                          <span className="text-lg font-semibold">{tamanho.nome}</span>
                          <span className="text-sm text-muted-foreground">{tamanho.tamanho} • {tamanho.fatias}</span>
                          <span className="text-xl font-bold text-primary mt-2">R$ {tamanho.preco}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Sabores */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">2. Escolha os Sabores</h2>
                  {tamanhoSelecionado && (
                    <Badge variant="secondary">
                      {saboresSelecionados.length}/{maxSabores} sabores
                    </Badge>
                  )}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {sabores.map((sabor) => (
                    <div
                      key={sabor.id}
                      onClick={() => toggleSabor(sabor.id)}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        saboresSelecionados.includes(sabor.id)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-2">{sabor.nome}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sabor.ingredientes.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Borda */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">3. Escolha a Borda</h2>
                <RadioGroup value={bordaSelecionada} onValueChange={setBordaSelecionada}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {bordas.map((borda) => (
                      <div key={borda.id} className="relative">
                        <RadioGroupItem
                          value={borda.id}
                          id={`borda-${borda.id}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`borda-${borda.id}`}
                          className="flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 hover:border-primary/50"
                        >
                          <span className="font-semibold">{borda.nome}</span>
                          <span className="text-primary font-bold">
                            {borda.preco === 0 ? 'Grátis' : `+R$ ${borda.preco}`}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Ingredientes */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">4. Personalize os Ingredientes</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-3 text-lg">Adicionar (+R$ 3,00 cada)</h3>
                  <div className="flex flex-wrap gap-2">
                    {ingredientesExtras.map((ingrediente) => (
                      <div
                        key={`add-${ingrediente}`}
                        onClick={() => toggleIngrediente(ingrediente, "adicionar")}
                        className={`px-4 py-2 rounded-full border-2 cursor-pointer transition-all ${
                          ingredientesAdicionar.includes(ingrediente)
                            ? 'border-accent bg-accent text-white'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        {ingrediente}
                      </div>
                    ))}
                  </div>
                </div>

                {saboresSelecionados.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-3 text-lg">Remover ingredientes da pizza</h3>
                    <div className="flex flex-wrap gap-2">
                      {getIngredientesDisponiveis().map((ingrediente) => (
                        <div
                          key={`rem-${ingrediente}`}
                          onClick={() => toggleIngrediente(ingrediente, "remover")}
                          className={`px-4 py-2 rounded-full border-2 cursor-pointer transition-all ${
                            ingredientesRemover.includes(ingrediente)
                              ? 'border-destructive bg-destructive text-white'
                              : 'border-border hover:border-destructive/50'
                          }`}
                        >
                          {ingrediente}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {saboresSelecionados.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Selecione os sabores primeiro para personalizar os ingredientes
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Resumo */}
          <div className="lg:sticky lg:top-8 h-fit">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6" />
                  Resumo do Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  {tamanhoSelecionado && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Tamanho</p>
                      <p className="font-semibold">
                        {tamanhos.find(t => t.id === tamanhoSelecionado)?.nome}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {tamanhos.find(t => t.id === tamanhoSelecionado)?.tamanho}
                      </p>
                    </div>
                  )}

                  {saboresSelecionados.length > 0 && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-muted-foreground mb-2">Sabores</p>
                      {saboresSelecionados.map(id => (
                        <p key={id} className="font-semibold">
                          • {sabores.find(s => s.id === id)?.nome}
                        </p>
                      ))}
                    </div>
                  )}

                  {bordaSelecionada && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-muted-foreground">Borda</p>
                      <p className="font-semibold">
                        {bordas.find(b => b.id === bordaSelecionada)?.nome}
                      </p>
                    </div>
                  )}

                  {ingredientesAdicionar.length > 0 && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-muted-foreground mb-2">Adicionar</p>
                      {ingredientesAdicionar.map(ing => (
                        <p key={ing} className="font-semibold text-accent">+ {ing}</p>
                      ))}
                    </div>
                  )}

                  {ingredientesRemover.length > 0 && (
                    <div className="pb-4 border-b">
                      <p className="text-sm text-muted-foreground mb-2">Remover</p>
                      {ingredientesRemover.map(ing => (
                        <p key={ing} className="font-semibold text-destructive">- {ing}</p>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-3xl font-bold text-primary">
                      R$ {calcularTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full text-lg"
                  onClick={finalizarPedido}
                  disabled={!tamanhoSelecionado || saboresSelecionados.length === 0}
                >
                  Finalizar no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedido;
