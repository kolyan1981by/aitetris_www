AitetrisWww::App.controllers :game do


  get :index do

    #data = Tetris.run_from_file(Padrino.root('/lib'),54,0)
    #@log = data[:log].join('<br/>')
    AitetrisWww::App.cache['game'] = Hash.new
    render 'index'

  end

  get "/round/:id", :provides => :json do
    begin
      r = params[:id].to_i
      #data = Tetris.run_from_file(Padrino.root('/lib'),r,0)


      {
        :field   => data[:field],
        :log     => data[:log].join('<br/>'),
      }.to_json

    rescue  => ex
      puts " #{ex.class}, message is #{ex.message}"
      puts ex.backtrace[0..3]
    end

  end

  get "/new", :provides => :json do
    AitetrisWww::App.cache['game'] = Hash.new
  end

  get "/play", :provides => :json do
    begin
      store = AitetrisWww::App.cache['game']

      r = params[:r].to_i
      pp = params[:pieces]
      mode = params[:mode]
      
      
      data = Tetris.play_round(store,r,pp,mode)
      AitetrisWww::App.cache['game'] = store

      {
        :field   => data[:field],
        :log     => data[:log].join('<br/>'),
      }.to_json if not data.nil?

    rescue  => ex
      puts " #{ex.class}, message is #{ex.message}"
      puts ex.backtrace[0..3]
    end

  end
end
