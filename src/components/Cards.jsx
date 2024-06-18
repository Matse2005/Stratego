"use client";

export function Card({ card, cards, color, colorFg }) {
  return (
    <div
      className="h-full bg-white border hover:opacity-50 w-[calc(500 / 3)]"
      style={{
        borderColor: color && color !== "#ffffff" ? color : "#000000",
      }}
    >
      <div
        className="relative h-full p-2 print:p-1 print:pb-3 pb-6 border-[16px] print:border-[8px] cursor-pointer"
        data-card="0"
        style={{ borderColor: color + "30" ?? "#ffffff" }}
      >
        <img
          src={card.image}
          alt={card.name}
          className="object-contain w-full mx-auto mb-4 print:mb-2 h-36 print:h-16 max-w-56 print:w-20"
        />
        <div className="flex flex-col align-items: flex-end">
          <h2 className="mb-2 text-2xl font-bold text-center text-black print:text-xs print:mb-1">
            {card.name}
          </h2>
          <p className="text-sm print:-mt-2 print:text-[7px] text-gray-700">
            Wint van:
          </p>
          {card.wins.length > 0 ? (
            <div className="flex flex-wrap justify-start mt-2 print:mt-1 gap-y-1 print:gap-y-[2px]">
              {card.wins.map((win) => (
                <span
                  key={win}
                  className="px-2 print:px-1 py-1 print:py-0 mr-2 print:mr-1 text-xs print:text-[6px] font-medium text-gray-700 bg-gray-200 rounded-full"
                >
                  {cards[win]?.id}. {cards[win]?.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm print:-mt-2 print:text-[7px] text-gray-700">
              Wint nooit
            </p>
          )}
          <p className="mt-2 print:mt-0 text-sm print:text-[7px] text-gray-700">
            Verliest van:
          </p>
          {card.loses.length > 0 ? (
            <div className="flex flex-wrap justify-start mt-2 print:mt-1 gap-y-1 print:gap-y-[2px]">
              {card.loses.map((lose) => (
                <span
                  key={lose}
                  className="px-2 print:px-1 py-1 print:py-0 mr-2 print:mr-1 text-xs print:text-[6px] font-medium text-gray-700 bg-red-200 rounded-full"
                >
                  {cards[lose]?.id}. {cards[lose]?.name}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-2 print:mt-1 text-sm print:text-[7px] text-gray-700">
              Verliest nooit
            </p>
          )}
          <div className="absolute bottom-0 block w-full pr-8 text-gray-500 print:pr-4">
            <p className="text-xs print:text-[6px] text-center">
              {card.canTouch
                ? "Deze kaart mag tikken."
                : "Deze kaart mag niet tikken."}
            </p>
          </div>
        </div>
        {card.numberVisible ? (
          <div
            className="absolute top-0 right-0 flex items-center justify-center w-10 h-10 mt-2 mr-2 rounded-full print:mt-1 print:mr-1 print:w-5 print:h-5"
            style={{
              color: colorFg ?? "#000000",
              backgroundColor:
                color && color != "#ffffff" ? color : "rgb(243 244 246)",
            }}
          >
            <span className="text-xl print:text-[10px] print:-pt-1 font-bold">
              {card.id}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
