import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
//import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Block } from "../hooks/useCanvas";
import { ScreenSize } from './ResponsiveControls';
import axios from 'axios';
import React, { useState, lazy } from 'react';
import { Loader2 } from "lucide-react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

import dynamic from 'next/dynamic'

interface DrawerFragmentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  updateBlock: (block: Block) => void;
  block?: Block;
  screenSize: ScreenSize
}

const DrawerFragment: React.FC<DrawerFragmentProps> = ({ isOpen, onOpenChange, updateBlock, block, screenSize }) => {
    const [prompt, setPrompt] = useState('');
    const [placeholder, setPlaceholder] = useState('Digite as alterações que deseja fazer ao componente...');
    const [isLoading, setIsLoading] = useState(false);
    const [componentCode, setComponentCode] = useState("");
    const [scope, setScope] = useState({});

    
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPrompt(event.target.value);
      };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            callChatGPT();
        }
        };

    function updateBlockProperties(id: string, properties: Record<string, any>): void {
        throw new Error('Function not implemented.');
    }

    const callChatGPT = async () => {
        setIsLoading(true);
        const elem = document.getElementById("drawer-content");
        let initialprompt = "És um programador React experiexnte. Recebe este código html de um componente: " + elem?.innerHTML + " e altera apenas e só o que está dentro da primeira section com base nas seguintes instruções: " + prompt + ". Nunca alteres divs classes, img srcs, ids, estilos de elementos que não sejam para alterar! Tenta manter o máximo do código existente! Por exemplo se uma div tem uma classname, um style com background-color e padding e que seja só necessário mudar o background-color, mantém tudo o resto! Nunca geres código javascript. Retorna APENAS um objecto com uma propriedade: 1) html = o html alterado com inclusão da section e outras divs abaixo que te foram passadas no prompt sem mais explicações, nem comentários nem nenhuma outra informação."
        initialprompt = "Cria um componente com base nestas instruções: " + prompt + ". Para tal tenta usar os seguinte componentes da nossa biblioteca caso precises. Deixo-te uma pequena documentação dos componentes disponiveis e a forma de utilizar: <component><name>Button</name></component><component><name>Card</name></component> Nunca geres código javascript. Nunca importes nenhum component. Retorna APENAS um object com duas propriedades: 1) 'html' = código do componente gerado, 2) 'components' = array dos nomes dos componentes que serão mais tarde importados, sem mais explicações, nem comentários nem nenhuma outra informação."

        try {
          const res = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: 'o1-mini',
              messages: [{ role: 'user', content: initialprompt }],
            },
            {
              headers: {
                Authorization: `Bearer OPENAI_API_KEY`,
                'Content-Type': 'application/json',
              },
            }
          );
          let newBlock = res.data.choices[0].message.content
          newBlock = newBlock.replace(/```json\n/g, '').replace(/\n```/g, '').replace('\n','')
          newBlock = JSON.parse(newBlock)

          if (newBlock) {
            let _scope = {}
            for (const element of newBlock.components) {
              _scope[element] = dynamic(() => import('./ui/'+element.toLowerCase()).then(mod =>  mod[element]));
            }

            setScope(_scope)
            setComponentCode(newBlock.html)
            //updateBlock(newBlock)
            setPrompt('')
            setIsLoading(false);
            setPlaceholder('Digite as alterações que deseja fazer ao componente...')
          }

        } catch (error) {
          console.error('Error fetching the API:', error);
        }
        
      };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom">
      
        <div className="space-y-0 py-0" id="drawer-content">
        { componentCode != '' ?
          <LiveProvider code={componentCode} scope={scope}>
            <LivePreview />
          </LiveProvider>
          : null }

          <div className="flex gap-2 py-2">
            <Textarea onChange={handleInputChange} onKeyDown={handleKeyDown} className="flex-1" placeholder={placeholder} />
            <Button onClick={() => callChatGPT()}>
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                'ALTERAR'
                )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerFragment;