"use client";

import React from 'react';

export const ConteudoPlaceholder = ({ titulo }: { titulo: string }) => (
  <div className="p-8">
    <h2 className="text-2xl font-bold text-gray-800">{titulo}</h2>
    <div className="mt-4 bg-white p-8 rounded-xl shadow-md h-96 flex items-center justify-center">
      <p className="text-gray-500">Conteúdo da página de {titulo} em desenvolvimento.</p>
    </div>
  </div>
);
