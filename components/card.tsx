"use client"

import { Card as CardType } from "@/types"
import Image from "next/image"

interface Props {
  card: CardType
  cards: CardType[]
  color: string
  colorFg: string
}

export function Card({ card, cards, color, colorFg }: Props) {
  return (
    <div
      className="mx-auto h-full w-full max-w-[333.33px] border bg-white hover:opacity-50 print:max-w-62.5"
      style={{
        borderColor: color && color !== "#ffffff" ? color : "#000000",
      }}
    >
      <div
        className="relative h-full cursor-pointer border-16 p-2 pb-8 print:border-8 print:p-1 print:pb-5"
        data-card="0"
        style={{ borderColor: color + "30" }}
      >
        <div className="relative mx-auto mb-4 h-36 w-full max-w-56 print:mb-2 print:h-24 print:max-w-32">
          <Image
            src={card.image}
            alt={card.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="align-items: flex-end flex flex-col">
          <h2 className="mb-2 text-center text-2xl font-bold text-black print:mb-1 print:text-base">
            {card.name}
          </h2>
          <p className="text-center text-sm text-gray-700 print:-mt-2 print:text-[9px]">
            Wint van:
          </p>
          {card.wins.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-start gap-y-1 print:mt-1 print:gap-y-0.5">
              {card.wins.map((win) => (
                <span
                  key={win}
                  className="mr-2 rounded-full bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 print:mr-1 print:px-1 print:py-0 print:text-[8px]"
                >
                  {(cards[win]?.numberVisible ? cards[win]?.id + ". " : "") +
                    cards[win]?.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-700 print:-mt-2 print:text-[8px]">
              Wint nooit
            </p>
          )}
          <p className="mt-2 text-center text-sm text-gray-700 print:mt-0 print:text-[9px]">
            Verliest van:
          </p>
          {card.loses.length > 0 ? (
            <div className="mt-2 flex flex-wrap justify-start gap-y-1 print:mt-1 print:gap-y-0.5">
              {card.loses.map((lose) => (
                <span
                  key={lose}
                  className="mr-2 rounded-full bg-red-200 px-2 py-1 text-xs font-medium text-gray-700 print:mr-1 print:px-1 print:py-0 print:text-[8px]"
                >
                  {(cards[lose]?.numberVisible ? cards[lose]?.id + ". " : "") +
                    cards[lose]?.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-center text-sm text-gray-700 print:-mt-2 print:text-[8px]">
              Verliest nooit
            </p>
          )}
          <div className="absolute bottom-0 block w-full pr-8 text-gray-500 print:pr-4">
            <p className="text-center text-xs print:text-[8px]">
              {card.canTap
                ? "Deze kaart mag tikken."
                : "Deze kaart mag niet tikken."}
            </p>
          </div>
        </div>
        {card.numberVisible ? (
          <div
            className="absolute top-0 right-0 mt-2 mr-2 flex h-10 w-10 items-center justify-center rounded-full print:mt-1 print:mr-1 print:h-7 print:w-7"
            style={{
              color: colorFg ?? "#000000",
              backgroundColor:
                color && color != "#ffffff" ? color : "rgb(243 244 246)",
            }}
          >
            <span className="text-xl font-bold print:-mt-0.5 print:text-[15px]">
              {card.id}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
