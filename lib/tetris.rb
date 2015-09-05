require_relative  'helper'


class Tetris

  def self.create_game
    gg = Game.new
  end

  def self.play_round(store,round,str_pieces, mode)
    data=nil

    return nil if round+1>= str_pieces.size
    

    if store.key?(round)
      p "get from store #{round}"
      data = store[round]

      #p data[:log].last
    else
      gg = store[:last_game]

      if gg.nil?
        max_key = 0
        gg=store[:last_game] = Game.new

        p "create new game"
      else
        max_key = store.select{ |k,v| k if not k.is_a?(Symbol)  }.keys.max+1
      end

      (max_key..round).each do |r|
        p "calc game #{r}"
        gg.round=r
        gg.this_piece_type = str_pieces[r]
        gg.next_piece_type = str_pieces[r+1]
        gg.map.force_mode = mode=='f'
        
        Bot.make_test_round(gg)
        log = gg.log.clone
        ff = gg.map.nice_field
        data=store[r] = {log: log, field:ff}

      end
      store[:last_game] = gg
    end
    data

  end

  def self.run_from_file(root_path='', round,steps)
    gg = Game.new
    stt = Settings.new
    res=""

    File.open(root_path+"/cmnds.txt", "r").each do |line|
      s = line
      next if /\S/ !~ s
      arr = s.split(' ')

      case arr[0]

      when "settings"
        set_settings(arr,stt)

      when "update"
        update_game(arr, gg) if arr[1] == 'game'
        update_player(arr, gg.my) if arr[1] == stt.your_bot
        update_player(arr, gg.other) if arr[1] != stt.your_bot

      when "action"
        startr = round
        endr=startr+steps
        next if gg.round<startr || gg.round >endr

        gg.log<< "-------round #{gg.round}"
        if gg.round==startr || false
          gg.map.parse_from(gg.my.field)
        end

        Bot.make_test_round(gg)

      end
    end
    {log: gg.log, field:gg.map.nice_field}

  end
end
