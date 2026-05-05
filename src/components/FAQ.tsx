"use client";
import { useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

export default function FAQ({ dict }: { dict: any }) {
  const faqs = [
    { q: dict.q1, a: dict.a1 },
    { q: dict.q2, a: dict.a2 },
    { q: dict.q3, a: dict.a3 },
    { q: dict.q4, a: dict.a4 },
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gradient pb-4 break-words">{dict.title}</h2>
      </div>

      <Accordion.Root type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <Accordion.Item key={i} value={`faq-${i}`} className="border border-white/10 rounded-2xl overflow-hidden glass data-[state=open]:border-primary/30 transition-all">
            <Accordion.Header className="flex">
              <Accordion.Trigger className="flex flex-1 items-center justify-between p-6 text-foreground font-bold hover:text-primary transition-all group outline-none">
                <span className="text-left text-lg">{faq.q}</span>
                <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0 ml-4">
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pb-6 text-foreground/60 leading-relaxed overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
              {faq.a}
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
