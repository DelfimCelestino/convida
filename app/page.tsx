"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/hooks/use-toast"
import { UserPlus, Send, Code, Download, X, Plus, Grid, List, Paintbrush, Users, Mail, LayoutDashboard } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import html2canvas from 'html2canvas'
import dynamic from 'next/dynamic'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ModeToggle } from '@/components/mode-toggle'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

type Convidado = {
  nome: string
  email: string
  avatar: string
}

type ModeloConvite = {
  id: string
  nome: string
  html: string
  preview: string
  descricao: string
  criador: string
  usos: number
}

type Tema = {
  id: string
  nome: string
  corPrimaria: string
  corSecundaria: string
  corFundo: string
  corTexto: string
}

export default function ConvitePersonalizado() {
  const [temas, setTemas] = useState<Tema[]>([
    { id: 'claro', nome: 'Claro', corPrimaria: '#3B82F6', corSecundaria: '#93C5FD', corFundo: '#FFFFFF', corTexto: '#1F2937' },
    { id: 'escuro', nome: 'Escuro', corPrimaria: '#60A5FA', corSecundaria: '#3B82F6', corFundo: '#1F2937', corTexto: '#F9FAFB' },
    { id: 'natureza', nome: 'Natureza', corPrimaria: '#34D399', corSecundaria: '#6EE7B7', corFundo: '#ECFDF5', corTexto: '#065F46' },
    { id: 'elegante', nome: 'Elegante', corPrimaria: '#8B5CF6', corSecundaria: '#C4B5FD', corFundo: '#F3F4F6', corTexto: '#4B5563' },
  ])

  const [modelos, setModelos] = useState<ModeloConvite[]>([
    {
      id: '1',
      nome: 'Modelo Floral',
      html: `
        <div style="background-color: var(--cor-fundo); color: var(--cor-texto); padding: 20px; border-radius: 10px; text-align: center; font-size: 14px;">
          <h1 style="font-family: 'Georgia', serif; color: var(--cor-primaria); font-size: 24px;">Convite Floral</h1>
          <p style="font-family: 'Arial', sans-serif;">Você está convidado para o <strong>${'${nomeEvento}'}</strong></p>
          <p style="font-family: 'Arial', sans-serif;">Data: ${'${data}'}</p>
          <p style="font-family: 'Arial', sans-serif;">Mensagem: ${'${mensagem}'}</p>
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591" alt="Floral Border" style="width: 100%; height: 300px; object-fit: cover;"/>
        </div>
      `,
      preview: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
      descricao: 'Um convite elegante com tema floral, perfeito para casamentos e eventos ao ar livre.',
      criador: 'Delfim Celestino',
      usos: 50
    },
    {
      id: '2',
      nome: 'Modelo Minimalista',
      html: `
        <div style="background-color: var(--cor-fundo); color: var(--cor-texto); padding: 30px; border: 1px solid var(--cor-secundaria); border-radius: 8px; text-align: center; font-size: 14px;">
          <h1 style="font-family: 'Helvetica', sans-serif; font-weight: bold; color: var(--cor-primaria); font-size: 24px;">Convite Minimalista</h1>
          <h2 style="font-family: 'Helvetica', sans-serif;">${'${nomeEvento}'}</h2>
          <p style="font-family: 'Helvetica', sans-serif;">Data: ${'${data}'}</p>
          <p style="font-family: 'Helvetica', sans-serif;">${'${mensagem}'}</p>
        </div>
      `,
      preview: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=500&h=300&fit=crop',
      descricao: 'Um design limpo e moderno, ideal para eventos corporativos e lançamentos de produtos.',
      criador: 'Delfim Celestino',
      usos: 30
    },
    {
      id: '3',
      nome: 'Modelo Vintage',
      html: `
        <div style="background-color: var(--cor-fundo); color: var(--cor-texto); padding: 20px; border-radius: 10px; text-align: center; font-family: 'Times New Roman', serif; font-size: 14px;">
          <h1 style="color: var(--cor-primaria); font-size: 24px;">Convite Vintage</h1>
          <h2 style="font-style: italic;">${'${nomeEvento}'}</h2>
          <p>Data: ${'${data}'}</p>
          <p>${'${mensagem}'}</p>
          <img src="https://images.unsplash.com/photo-1503431128871-cd250803fa41" alt="Vintage Border" style="width: 100%; height: 300px; object-fit: cover;"/>
        </div>
      `,
      preview: 'https://images.unsplash.com/photo-1503431128871-cd250803fa41?w=500&h=300&fit=crop',
      descricao: 'Um convite com estilo retrô, perfeito para festas temáticas e eventos nostálgicos.',
      criador: 'Delfim Celestino',
      usos: 20
    },
    {
      id: '4',
      nome: 'Modelo Moderno',
      html: `
        <div style="background-color: var(--cor-fundo); color: var(--cor-texto); padding: 20px; border-radius: 10px; text-align: center; font-family: 'Arial', sans-serif; font-size: 14px;">
          <h1 style="font-size: 24px; text-transform: uppercase; color: var(--cor-primaria);">Convite Moderno</h1>
          <h2>${'${nomeEvento}'}</h2>
          <p style="font-weight: bold;">Data: ${'${data}'}</p>
          <p>${'${mensagem}'}</p>
          <div style="background-color: var(--cor-secundaria); height: 4px; margin: 10px 0;"></div>
        </div>
      `,
      preview: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=300&fit=crop',
      descricao: 'Um design contemporâneo e arrojado, ideal para eventos de tecnologia e conferências.',
      criador: 'Delfim Celestino',
      usos: 15
    }
  ])

  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloConvite | null>(null)
  const [convidados, setConvidados] = useState<Convidado[]>([])
  const [dadosEvento, setDadosEvento] = useState({
    nomeEvento: '',
    data: '',
    mensagem: '',
  })
  const [novoConvidado, setNovoConvidado] = useState({ nome: '', email: '' })
  const [emailEnvio, setEmailEnvio] = useState('')
  const [htmlPersonalizado, setHtmlPersonalizado] = useState('')
  const [camposPersonalizados, setCamposPersonalizados] = useState<Record<string, string>>({})
  const [novoCampo, setNovoCampo] = useState({ nome: '', valor: '' })
  const [visualizacao, setVisualizacao] = useState<'grid' | 'list'>('grid')
  const [temaSelecionado, setTemaSelecionado] = useState<Tema>(temas[0])
  const [editandoHTML, setEditandoHTML] = useState(false)
  const [novoModelo, setNovoModelo] = useState<Omit<ModeloConvite, 'id' | 'usos'>>({
    nome: '',
    html: '',
    preview: '',
    descricao: '',
    criador: 'Delfim Celestino',
  })
  const [novoTema, setNovoTema] = useState<Omit<Tema, 'id'>>({
    nome: '',
    corPrimaria: '#000000',
    corSecundaria: '#000000',
    corFundo: '#FFFFFF',
    corTexto: '#000000',
  })
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modeloSelecionado) {
      setHtmlPersonalizado(modeloSelecionado.html)
    }
  }, [modeloSelecionado])

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      :root {
        --cor-primaria: ${temaSelecionado.corPrimaria};
        --cor-secundaria: ${temaSelecionado.corSecundaria};
        --cor-fundo: ${temaSelecionado.corFundo};
        --cor-texto: ${temaSelecionado.corTexto};
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [temaSelecionado])

  const handleModeloSelecionado = (modelo: ModeloConvite) => {
    setModeloSelecionado(modelo)
    setModelos(modelos.map(m => m.id === modelo.id ? { ...m, usos: m.usos + 1 } : m))
  }

  const handleDadosEventoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDadosEvento({
      ...dadosEvento,
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

  const handleEnviarConvite = () => {
    const convidado = convidados.find(c => c.email === emailEnvio)
    if (!convidado || !modeloSelecionado) {
      toast({
        title: "Erro",
        description: convidado ? "Selecione um modelo de convite" : "Convidado não encontrado",
        variant: "destructive"
      })
      return
    }

    console.log(`Enviando convite para ${convidado.nome} (${convidado.email})`)
    console.log('Dados do evento:', dadosEvento)
    console.log('Modelo:', modeloSelecionado)
    console.log('HTML Personalizado:', htmlPersonalizado)
    console.log('Campos Personalizados:', camposPersonalizados)

    toast({
      title: "Sucesso",
      description: `Convite enviado para ${convidado.nome}`,
    })

    setEmailEnvio('')
  }

  const renderizarConvite = () => {
    if (!modeloSelecionado) return null
    let html = htmlPersonalizado
    Object.entries(dadosEvento).forEach(([key, value]) => {
      html = html.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value)
    })
    Object.entries(camposPersonalizados).forEach(([key, value]) => {
      html = html.replace(new RegExp(`\\$\\{${key}\\}`, 'g'), value)
    })

    html = html.replace(/\$\{([^}]+)\}/g, (match, p1) => {
      return `<span data-placeholder="${p1}">${camposPersonalizados[p1] || p1}</span>`
    })

    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  const gerarImagem = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = 'convite.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const handleAdicionarCampoPersonalizado = (e: React.FormEvent) => {
    e.preventDefault()
    if (novoCampo.nome && novoCampo.valor) {
      setCamposPersonalizados({
        ...camposPersonalizados,
        [novoCampo.nome]: novoCampo.valor
      })
      setNovoCampo({ nome: '', valor: '' })
    }
  }

  const handleAdicionarModelo = (e: React.FormEvent) => {
    e.preventDefault()
    if (novoModelo.nome && novoModelo.html && novoModelo.preview && novoModelo.descricao) {
      setModelos([...modelos, { ...novoModelo, id: Date.now().toString(), usos: 0 }])
      setNovoModelo({
        nome: '',
        html: '',
        preview: '',
        descricao: '',
        criador: 'Delfim Celestino',
      })
    }
  }

  const handleAdicionarTema = (e: React.FormEvent) => {
    e.preventDefault()
    if (novoTema.nome) {
      setTemas([...temas, { ...novoTema, id: Date.now().toString() }])
      setNovoTema({
        nome: '',
        corPrimaria: '#000000',
        corSecundaria: '#000000',
        corFundo: '#FFFFFF',
        corTexto: '#000000',
      })
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <ModeToggle />
      <h1 className="text-3xl font-bold mb-6 text-center">Sistema de Convites Personalizados</h1>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard"><LayoutDashboard className="w-4 h-4 mr-2" />Dashboard</TabsTrigger>
          <TabsTrigger value="modelo"><Paintbrush className="w-4 h-4 mr-2" />Modelos</TabsTrigger>
          <TabsTrigger value="personalizar"><Code className="w-4 h-4 mr-2" />Personalizar</TabsTrigger>
          <TabsTrigger value="convidados"><Users className="w-4 h-4 mr-2" />Convidados</TabsTrigger>
          <TabsTrigger value="enviar"><Mail className="w-4 h-4 mr-2" />Enviar</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Uso dos Modelos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={modelos}>
                        <XAxis dataKey="nome" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="usos" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>Total de Modelos: {modelos.length}</p>
                      <p>Total de Convidados: {convidados.length}</p>
                      <p>Modelo Mais Usado: {modelos.reduce((a, b) => a.usos > b.usos ? a : b).nome}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modelo">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Escolha um Modelo</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" onClick={() => setVisualizacao('grid')}>
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => setVisualizacao('list')}>
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={visualizacao === 'grid' ? "grid grid-cols-2 gap-4" : "space-y-4"}>
                {modelos.map(modelo => (
                  <Card 
                    key={modelo.id} 
                    onClick={() => handleModeloSelecionado(modelo)} 
                    className={`cursor-pointer hover:shadow-lg transition-shadow ${modeloSelecionado?.id === modelo.id ? 'ring-2 ring-primary' : ''}`}
                  >
                    <CardContent className={visualizacao === 'grid' ? "p-4" : "p-4 flex items-center space-x-4"}>
                      <img src={modelo.preview} alt={modelo.nome} className={visualizacao === 'grid' ? "w-full h-40 object-cover rounded mb-4" : "w-24 h-24 object-cover rounded"} />
                      <div>
                        <h3 className="text-lg font-bold">{modelo.nome}</h3>
                        <p className="text-sm text-gray-600">{modelo.descricao}</p>
                        <p className="text-xs text-gray-500">Criado por: {modelo.criador}</p>
                        <p className="text-xs text-gray-500">Usos: {modelo.usos}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Adicionar Novo Modelo</h3>
                <form onSubmit={handleAdicionarModelo} className="space-y-4">
                  <Input
                    placeholder="Nome do modelo"
                    value={novoModelo.nome}
                    onChange={(e) => setNovoModelo({ ...novoModelo, nome: e.target.value })}
                  />
                  <Textarea
                    placeholder="HTML do modelo"
                    value={novoModelo.html}
                    onChange={(e) => setNovoModelo({ ...novoModelo, html: e.target.value })}
                  />
                  <Input
                    placeholder="URL da imagem de preview"
                    value={novoModelo.preview}
                    onChange={(e) => setNovoModelo({ ...novoModelo, preview: e.target.value })}
                  />
                  <Textarea
                    placeholder="Descrição do modelo"
                    value={novoModelo.descricao}
                    onChange={(e) => setNovoModelo({ ...novoModelo, descricao: e.target.value })}
                  />
                  <Input
                    placeholder="Criador do modelo"
                    value={novoModelo.criador}
                    onChange={(e) => setNovoModelo({ ...novoModelo, criador: e.target.value })}
                  />
                  <Button type="submit">Adicionar Modelo</Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="personalizar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Editar Convite</h2>
                <div className="space-y-4">
                  {!editandoHTML && (
                    <>
                      <div>
                        <Label htmlFor="nomeEvento">Nome do Evento</Label>
                        <Input id="nomeEvento" name="nomeEvento" value={dadosEvento.nomeEvento} onChange={handleDadosEventoChange} />
                      </div>
                      <div>
                        <Label htmlFor="data">Data do Evento</Label>
                        <Input id="data" name="data" type="date" value={dadosEvento.data} onChange={handleDadosEventoChange} />
                      </div>
                      <div>
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" name="mensagem" value={dadosEvento.mensagem} onChange={handleDadosEventoChange} />
                      </div>
                      <div>
                        <Label>Tema</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {temas.map(tema => (
                            <Button
                              key={tema.id}
                              variant={temaSelecionado.id === tema.id ? "default" : "outline"}
                              onClick={() => setTemaSelecionado(tema)}
                              className="justify-start"
                            >
                              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: tema.corPrimaria }}></div>
                              {tema.nome}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">Adicionar Novo Tema</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Novo Tema</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAdicionarTema} className="space-y-4">
                            <Input
                              placeholder="Nome do tema"
                              value={novoTema.nome}
                              onChange={(e) => setNovoTema({ ...novoTema, nome: e.target.value })}
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <Label htmlFor="corPrimaria">Cor Primária</Label>
                                <Input
                                  id="corPrimaria"
                                  type="color"
                                  value={novoTema.corPrimaria}
                                  onChange={(e) => setNovoTema({ ...novoTema, corPrimaria: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="corSecundaria">Cor Secundária</Label>
                                <Input
                                  id="corSecundaria"
                                  type="color"
                                  value={novoTema.corSecundaria}
                                  onChange={(e) => setNovoTema({ ...novoTema, corSecundaria: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="corFundo">Cor de Fundo</Label>
                                <Input
                                  id="corFundo"
                                  type="color"
                                  value={novoTema.corFundo}
                                  onChange={(e) => setNovoTema({ ...novoTema, corFundo: e.target.value })}
                                />
                              </div>
                              <div>
                                <Label htmlFor="corTexto">Cor do Texto</Label>
                                <Input
                                  id="corTexto"
                                  type="color"
                                  value={novoTema.corTexto}
                                  onChange={(e) => setNovoTema({ ...novoTema, corTexto: e.target.value })}
                                />
                              </div>
                            </div>
                            <Button type="submit">Adicionar Tema</Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Campos Personalizados</h3>
                        <form onSubmit={handleAdicionarCampoPersonalizado} className="flex space-x-2 mb-2">
                          <Input
                            placeholder="Nome do campo"
                            value={novoCampo.nome}
                            onChange={(e) => setNovoCampo({ ...novoCampo, nome: e.target.value })}
                          />
                          <Input
                            placeholder="Valor do campo"
                            value={novoCampo.valor}
                            onChange={(e) => setNovoCampo({ ...novoCampo, valor: e.target.value })}
                          />
                          <Button type="submit">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </form>
                        <ScrollArea className="h-[100px]">
                          {Object.entries(camposPersonalizados).map(([nome, valor], index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                              <span>{nome}: {valor}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newCampos = { ...camposPersonalizados }
                                  delete newCampos[nome]
                                  setCamposPersonalizados(newCampos)
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </ScrollArea>
                      </div>
                    </>
                  )}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-html"
                      checked={editandoHTML}
                      onCheckedChange={setEditandoHTML}
                    />
                    <Label htmlFor="edit-html">Editar HTML</Label>
                  </div>
                  {editandoHTML && (
                    <MonacoEditor
                      height="400px"
                      language="html"
                      theme="vs-dark"
                      value={htmlPersonalizado}
                      onChange={(value) => setHtmlPersonalizado(value || '')}
                      options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                      }}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Visualização do Convite</h2>
                <div 
                  id="previewConvite" 
                  ref={previewRef} 
                  className="border border-gray-300 rounded p-4 mb-4"
                  style={{ width: '100%', height: '500px', overflow: 'auto' }}
                >
                  {renderizarConvite()}
                </div>
                <Button onClick={gerarImagem}>
                  <Download className="mr-2 h-4 w-4" /> Baixar Convite
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="convidados">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Adicione Convidados</h2>
              <form onSubmit={handleAdicionarConvidado} className="space-y-4">
                <div>
                  <Label htmlFor="nomeConvidado">Nome do Convidado</Label>
                  <Input
                    id="nomeConvidado"
                    type="text"
                    value={novoConvidado.nome}
                    onChange={(e) => setNovoConvidado({ ...novoConvidado, nome: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="emailConvidado">Email do Convidado</Label>
                  <Input
                    id="emailConvidado"
                    type="email"
                    value={novoConvidado.email}
                    onChange={(e) => setNovoConvidado({ ...novoConvidado, email: e.target.value })}
                  />
                </div>
                <Button type="submit">
                  <UserPlus className="mr-2 h-4 w-4" /> Adicionar Convidado
                </Button>
              </form>
              <ScrollArea className="h-[300px] mt-4">
                {convidados.map((convidado, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-accent rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={convidado.avatar} alt={convidado.nome} />
                        <AvatarFallback>{convidado.nome.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{convidado.nome}</p>
                        <p className="text-sm text-muted-foreground">{convidado.email}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setConvidados(convidados.filter((_, i) => i !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enviar">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Enviar Convite</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emailEnvio">Email do Convidado</Label>
                  <Input
                    id="emailEnvio"
                    type="email"
                    value={emailEnvio}
                    onChange={(e) => setEmailEnvio(e.target.value)}
                  />
                </div>
                <Button onClick={handleEnviarConvite}>
                  <Send className="mr-2 h-4 w-4" /> Enviar Convite
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}