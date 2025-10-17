import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Pizza, ChefHat, Timer, Heart } from "lucide-react";
import pizzaHero from "@/assets/pizza-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${pizzaHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.3)',
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Pizza className="w-20 h-20 mx-auto mb-6 text-primary animate-[float_3s_ease-in-out_infinite]" />
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
              Pizza Artesanal
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Monte sua pizza perfeita! Escolha tamanho, sabores, bordas e ingredientes do seu jeito.
            </p>
            <Button 
              size="lg"
              onClick={() => navigate('/pedido')}
              className="text-xl px-12 py-8 bg-gradient-to-r from-primary to-[hsl(8_88%_54%)] hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-[pulse-glow_2s_ease-in-out_infinite]"
            >
              Monte sua Pizza
            </Button>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg viewBox="0 0 1440 120" className="w-full fill-background">
            <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Por que escolher a gente?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-[hsl(8_88%_54%)] flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Artesanal</h3>
              <p className="text-muted-foreground">
                Massa feita diariamente com ingredientes selecionados
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-[hsl(42_95%_45%)] flex items-center justify-center">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Entrega Rápida</h3>
              <p className="text-muted-foreground">
                Pizza quentinha na sua casa em até 40 minutos
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-card hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent to-[hsl(142_76%_30%)] flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Feito com Amor</h3>
              <p className="text-muted-foreground">
                Cada pizza é preparada com carinho e dedicação
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-[hsl(8_88%_54%)]">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tá esperando o quê?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Monte sua pizza do jeito que você gosta!
          </p>
          <Button 
            size="lg"
            variant="secondary"
            onClick={() => navigate('/pedido')}
            className="text-xl px-12 py-8 hover:scale-105 transition-transform"
          >
            Começar Agora
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
