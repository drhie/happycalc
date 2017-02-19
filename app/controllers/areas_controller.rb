class AreasController < ApplicationController
  def index
    @area = Area.new
    @areas = Area.all
  end

  def new
    @area = Area.new
  end

  def create
    @area = Area.create(area_params)
    if @area.save
      respond_to do |format|
        format.json do
          render json: @area, except: %i(created_at updated_at)
        end
      end
    end
  end

  def show
    @area = Area.find(params[:id])
  end

  def area_params
    params.require(:area).permit(:name, :importance, :satisfaction)
  end
end
