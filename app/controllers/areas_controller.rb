class AreasController < ApplicationController
  def index
    @area = Area.new
    @areas = Area.all
    respond_to do |format|
      format.html do
        render :index
      end
      format.json do
        render json: @areas
      end
    end
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

  def destroy
    # byebug
    @area = Area.all.where(session_id: params[:session_id]) #fix this!
    @area.delete_all
  end

  def destroy_all
    Area.delete_all
  end

  def area_params
    params.require(:area).permit(:name, :importance, :satisfaction, :session_id)
  end
end
