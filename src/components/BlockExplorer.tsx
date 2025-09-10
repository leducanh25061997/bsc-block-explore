import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBlockMint } from '@/contexts/BlockMintContext';
import { Clock, Hash, Activity, User } from 'lucide-react';
import { IBlock } from '@/types/types';
import { getBlocks } from '@/services/service';
import moment from "moment"
import useUserState from '@/stores/user';

interface BlockExplorerProps {
  onSelectBlock: (blockNumber: string, hash: string) => void;
  blocks: Array<IBlock>
}

const BlockExplorer: React.FC<BlockExplorerProps> = ({ onSelectBlock, blocks }) => {
  const { tradeReg } = useUserState();
  console.log(tradeReg, "tradeReg")
  console.log(blocks, "blocks")
  // const { blocks } = useBlockMint();


  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="space-y-6" data-id="u2lmr84t2" data-path="src/components/BlockExplorer.tsx">
      <div className="text-center mb-8" data-id="hs8az25so" data-path="src/components/BlockExplorer.tsx">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4" data-id="z7uk44kel" data-path="src/components/BlockExplorer.tsx">
          BSC Block Explorer
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto" data-id="1nhuvnoxk" data-path="src/components/BlockExplorer.tsx">
          Explore Binance Smart Chain blocks and select any block to perform transactions within it.
        </p>
      </div>

      <div className="grid gap-4" data-id="wkq4tnzsv" data-path="src/components/BlockExplorer.tsx">
        {blocks.map((block) =>
          <Card key={block.number} className={`hover:shadow-lg transition-shadow border-l-4 ${block.status === "lock" ? "border-l-red-500" : "border-l-blue-500"}`} data-id="775adkeo5" data-path="src/components/BlockExplorer.tsx">
            <CardHeader className="pb-3" data-id="94zr7q8b9" data-path="src/components/BlockExplorer.tsx">
              <div className="flex items-center justify-between" data-id="192drqvlh" data-path="src/components/BlockExplorer.tsx">
                <CardTitle className="text-lg font-semibold text-gray-800" data-id="9x0nob0e3" data-path="src/components/BlockExplorer.tsx">
                  Block #{block.number}
                </CardTitle>
                <div className=''>
                  <Badge variant="secondary" className={`${block.status === "lock" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`} data-id="a76cpu3mg" data-path="src/components/BlockExplorer.tsx">
                    <User className="w-3 h-3 mr-1" data-id="hy0z067hp" data-path="src/components/BlockExplorer.tsx" />
                    {block.amount}
                  </Badge>
                  {"/"}
                  <Badge variant="secondary" className={`${block.status === "lock" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`} data-id="a76cpu3mg" data-path="src/components/BlockExplorer.tsx">
                    <Activity className="w-3 h-3 mr-1" data-id="hy0z067hp" data-path="src/components/BlockExplorer.tsx" />
                    {block.tnx} txns
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3" data-id="mqc5i6jkf" data-path="src/components/BlockExplorer.tsx">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="xtjlyf82x" data-path="src/components/BlockExplorer.tsx">
                <div className="space-y-2" data-id="yfba9p1bw" data-path="src/components/BlockExplorer.tsx">
                  <div className="flex items-center text-sm text-gray-600" data-id="i295ec6fp" data-path="src/components/BlockExplorer.tsx">
                    <Hash className="w-4 h-4 mr-2" data-id="b79q48e71" data-path="src/components/BlockExplorer.tsx" />
                    <span className="font-medium" data-id="z935ytdpv" data-path="src/components/BlockExplorer.tsx">Hash:</span>
                  </div>
                  <div className="font-mono text-xs bg-gray-100 p-2 rounded break-all" data-id="blj9u5zur" data-path="src/components/BlockExplorer.tsx">
                    {block.hash}
                  </div>
                </div>
                <div className="space-y-2 flex flex-row justify-between" data-id="wpri7z3bm" data-path="src/components/BlockExplorer.tsx">
                  <div className=''>
                    <div className="flex items-center text-sm text-gray-600" data-id="5ujf9lo36" data-path="src/components/BlockExplorer.tsx">
                      <Clock className="w-4 h-4 mr-2" data-id="tyih3xhjo" data-path="src/components/BlockExplorer.tsx" />
                      <span className="font-medium" data-id="yxnwytwmm" data-path="src/components/BlockExplorer.tsx">Timestamp:</span>
                    </div>
                    <div className="text-sm" data-id="xiyw0hg20" data-path="src/components/BlockExplorer.tsx">
                      {moment(block.createdAt).format("DD/mm/yyyy")}
                    </div>
                  </div>
                  {tradeReg?.block === Number(block.number) && (
                    <div className='flex justify-between text-sm'>
                      <p>Address:{" "}{tradeReg?.address.slice(0, 6)}...{tradeReg?.address.slice(-4)}</p>
                      <p className='px-[4px]'>{"/"}</p>
                      <p>Amount: {tradeReg.amount} BNB</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-2" data-id="zbtpuk163" data-path="src/components/BlockExplorer.tsx">
                <Button
                  disabled={block.status === "lock"}
                  onClick={() => onSelectBlock(block.number, block.hash)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" data-id="qpcirei97" data-path="src/components/BlockExplorer.tsx">

                  Select Block for Transaction
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>);

};

export default BlockExplorer;