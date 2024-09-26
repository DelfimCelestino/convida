'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { Calendar, MessageSquare, UserPlus, Send,  Palette, Code } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Convidado = {
  nome: string
  email: string
  avatar: string
}

export default function ConviteOnelink() {
  const [convite, setConvite] = useState({
    titulo: '',
    data: '',
    mensagem: '',
    cor: '#000000',
    fundo: '#ffffff'
  })
  const [convidados, setConvidados] = useState<Convidado[]>([])
  const [novoConvidado, setNovoConvidado] = useState({ nome: '', email: '' })
  const [htmlPersonalizado, setHtmlPersonalizado] = useState('')
  const [usarHtmlPersonalizado, setUsarHtmlPersonalizado] = useState(false)

  const handleConviteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setConvite({
      ...convite,
      [e.target.name]: e.target.value
    })
  }

  const handleAdicionarConvidado = (e: React.FormEvent) => {
    e.preventDefault()
    if (novoConvidado.nome && novoConvidado.email) {
      setConvidados([...convidados, {
        ...novoConvidado,
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${novoConvidado.nome}`
      }])
      setNovoConvidado({ nome: '', email: '' })
    }
  }

  const handleEnviarConvite = (email: string) => {
    // Aqui você implementaria a lógica real de envio do convite
    console.log(`Enviando convite para ${email}`)
    console.log('Dados do convite:', convite)
    console.log('HTML Personalizado:', htmlPersonalizado)

    toast({
      title: "Sucesso",
      description: `Convite enviado para ${email}`,
    })
  }

  const renderizarConvite = () => {
    if (usarHtmlPersonalizado) {
      let html = htmlPersonalizado
      Object.entries(convite).forEach(([key, value]) => {
        html = html.replace(new RegExp(`{{${key}}}`, 'g'), value)
      })
      return <div dangerouslySetInnerHTML={{ __html: html }} />
    }

    return (
      <div style={{ backgroundColor: convite.fundo, color: convite.cor, padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>{convite.titulo}</h1>
        <p style={{ fontSize: '18px', marginBottom: '10px' }}>{convite.data}</p>
        <p style={{ fontSize: '16px' }}>{convite.mensagem}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="mb-6">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6 text-center">Seu Convite Onelink</h1>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                name="titulo"
                placeholder="Título do Evento"
                value={convite.titulo}
                onChange={handleConviteChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-500" />
              <Input
                name="data"
                type="date"
                value={convite.data}
                onChange={handleConviteChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <MessageSquare className="text-gray-500" />
              <Textarea
                name="mensagem"
                placeholder="Mensagem do convite"
                value={convite.mensagem}
                onChange={handleConviteChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Palette className="text-gray-500" />
              <Input
                name="cor"
                type="color"
                value={convite.cor}
                onChange={handleConviteChange}
              />
              <Label htmlFor="cor">Cor do Texto</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Palette className="text-gray-500" />
              <Input
                name="fundo"
                type="color"
                value={convite.fundo}
                onChange={handleConviteChange}
              />
              <Label htmlFor="fundo">Cor de Fundo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="html-personalizado"
                checked={usarHtmlPersonalizado}
                onCheckedChange={setUsarHtmlPersonalizado}
              />
              <Label htmlFor="html-personalizado">Usar HTML Personalizado</Label>
            </div>
            {usarHtmlPersonalizado && (
              <div className="flex items-start space-x-2">
                <Code className="text-gray-500 mt-2" />
                <Textarea
                  placeholder="Insira seu HTML personalizado aqui"
                  value={htmlPersonalizado}
                  onChange={(e) => setHtmlPersonalizado(e.target.value)}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Visualização do Convite</h2>
          <div className="border p-4 rounded">
            {renderizarConvite()}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Convidados</h2>
          <form onSubmit={handleAdicionarConvidado} className="flex space-x-2 mb-4">
            <Input
              placeholder="Nome"
              value={novoConvidado.nome}
              onChange={(e) => setNovoConvidado({...novoConvidado, nome: e.target.value})}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={novoConvidado.email}
              onChange={(e) => setNovoConvidado({...novoConvidado, email: e.target.value})}
              required
            />
            <Button type="submit"><UserPlus className="mr-2" /> Adicionar</Button>
          </form>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {convidados.map((convidado, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src={convidado.avatar} alt={convidado.nome} />
                      <AvatarFallback>{convidado.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{convidado.nome}</span>
                    <span className="text-gray-500 text-sm">{convidado.email}</span>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="space-y-4">
                        <h3 className="font-medium">Enviar convite para {convidado.nome}?</h3>
                        <Button onClick={() => handleEnviarConvite(convidado.email)}>
                          Confirmar envio
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}